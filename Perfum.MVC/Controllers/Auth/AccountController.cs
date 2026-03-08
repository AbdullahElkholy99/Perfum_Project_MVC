
using Microsoft.EntityFrameworkCore;
using Perfum.Services.Services.Authentication;
using System.Security.Claims;

namespace Perfum.MVC.Controllers.Auth;

public class AccountController : Controller
{
    private readonly IServiceManager _serviceManager;
    private readonly AppDbContext _dbContext;
    private readonly IEmailSender _emailSender;
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;

    public AccountController(IServiceManager serviceManager,
                             AppDbContext dbContext,
                             IEmailSender emailSender,
                             UserManager<User> userManager,
                             SignInManager<User> signInManager)
    {
        _serviceManager = serviceManager;
        _dbContext = dbContext;
        _emailSender = emailSender;
        _userManager = userManager;
        _signInManager = signInManager;
    }


    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult GoogleLogin(string? returnUrl = null)
    {
        var redirectUrl = Url.Action(nameof(GoogleResponse), "Account", new { returnUrl });
        var properties = _signInManager.ConfigureExternalAuthenticationProperties("Google", redirectUrl!);
        return Challenge(properties, "Google");
    }

    public async Task<IActionResult> GoogleResponse(string? returnUrl = null, string? remoteError = null)
    {
        returnUrl ??= Url.Content("~/");

        if (!string.IsNullOrEmpty(remoteError))
        {
            TempData["RegisterSuccess"] = "Google sign-in was cancelled or failed. Please try again or use email and password.";
            return RedirectToAction(nameof(Login));
        }

        var info = await _signInManager.GetExternalLoginInfoAsync();
        if (info == null)
        {
            TempData["RegisterSuccess"] = "Error loading external login information. Please try again.";
            return RedirectToAction(nameof(Login));
        }

        // Try to sign in with existing external login
        var externalSignInResult = await _signInManager.ExternalLoginSignInAsync(
            info.LoginProvider,
            info.ProviderKey,
            isPersistent: true);

        User? user = null;

        if (externalSignInResult.Succeeded)
        {
            user = await _userManager.FindByLoginAsync(info.LoginProvider, info.ProviderKey);
        }
        else
        {
            var email = info.Principal.FindFirstValue(ClaimTypes.Email);
            if (string.IsNullOrEmpty(email))
            {
                TempData["RegisterSuccess"] = "We could not get your email from Google. Please sign up using email and password.";
                return RedirectToAction(nameof(Register));
            }

            user = await _userManager.FindByEmailAsync(email);

            if (user == null)
            {
                var name = info.Principal.FindFirstValue(ClaimTypes.Name) ?? email;
                var pictureUrl = info.Principal.FindFirstValue("picture");

                user = new Customer
                {
                    Email = email,
                    UserName = name,
                    EmailConfirmed = true,
                    ImagePath = pictureUrl
                };

                var createResult = await _userManager.CreateAsync(user);
                if (!createResult.Succeeded)
                {
                    ModelState.AddModelError(string.Empty, "We could not create your account from Google info. Please try again or register manually.");
                    return RedirectToAction(nameof(Register));
                }

                // Assign default Customer role
                await _userManager.AddToRoleAsync(user, "Customer");
            }

            var addLoginResult = await _userManager.AddLoginAsync(user, info);
            if (!addLoginResult.Succeeded)
            {
                TempData["RegisterSuccess"] = "We could not link your Google account. You can still sign in using email and password.";
            }

            await _signInManager.SignInAsync(user, isPersistent: true);
        }

        if (user == null)
        {
            TempData["RegisterSuccess"] = "We could not sign you in with Google. Please try again.";
            return RedirectToAction(nameof(Login));
        }

        var roles = await _userManager.GetRolesAsync(user);

        SetAuthCookies(user.Id, user.Email!, user.UserName ?? user.Email!, user.ImagePath, roles);

        if (roles.Contains("Admin"))
            return RedirectToAction("Index", "Customer");

        if (roles.Contains("Customer"))
            return RedirectToAction("Index", "Home");

        return Redirect(returnUrl);
    }
    public IActionResult Login()
    {
        var id = Request.Cookies["Id"];
        var role = Request.Cookies["Role"];

        if (id == null || role == null)
            return View();

        if (role == "Admin")
            return RedirectToAction("Index", "Customer");

        if (role == "Customer")
            return RedirectToAction("Index", "Home");

        return RedirectToAction("Index", "Home");
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Login(LoginVM model)
    {

        if (!ModelState.IsValid)
        {
            return View(model);
        }
        LoginResultVM? result = await _serviceManager.UserService.IsAuthenticate(model);
        if (result.RequiresEmailConfirmation)
        {
            ModelState.AddModelError("", "Please verify your email first. Check your inbox for the verification code.");
            ViewBag.RequiresEmailConfirmation = true;
            return View(model);
        }
        if (result.Result)
        {
            var roles = result.Roles;

            SetAuthCookies(result.Id, result.Email, result.UserName, result.ImagePath, roles);

            // Redirect: Customer -> Home
            //Admin -> Customer controller
            if (roles.Contains("Admin"))
                return RedirectToAction("Index", "Product");

            if (roles.Contains("Customer"))
                return RedirectToAction("Index", "Home");

            return RedirectToAction("Index", "Home");
        }

        ModelState.AddModelError("", "Invalid Login");
        return View(model);
    }

    private void SetAuthCookies(int id, string email, string userName, string? imagePath, IList<string> roles)
    {
        var options = new CookieOptions
        {
            HttpOnly = true,
            IsEssential = true,
            Secure = false,
            SameSite = SameSiteMode.Lax,
            Expires = DateTimeOffset.UtcNow.AddDays(7)
        };

        Response.Cookies.Append("Id", id.ToString(), options);
        Response.Cookies.Append("Email", email, options);
        Response.Cookies.Append("Name", userName, options);
        Response.Cookies.Append("ImagePath", imagePath ?? string.Empty, options);
        if (roles != null && roles.Count > 0)
        {
            Response.Cookies.Append("Role", roles[0], options);
        }
    }

    public IActionResult Register()
    {
        return View();
    }
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Register(RegisterVM model)
    {
        if (!ModelState.IsValid)
        {
            return View(model);
        }
        try
        {
            var result = await _serviceManager.UserService.RegisterAsync(model);
            if (result.Succeeded)
            {
                var user = await _serviceManager.UserService.FindByEmailAsync(model.Email);
                if (user != null)
                {
                    var code = PasswordResetService.GenerateNumericCode();
                    var codeHash = PasswordResetService.HashCode(code);

                    var entity = new EmailConfirmationCode
                    {
                        UserId = user.Id,
                        CodeHash = codeHash,
                        ExpiresAtUtc = DateTime.UtcNow.AddMinutes(10),
                        Used = false
                    };

                    _dbContext.EmailConfirmationCodes.Add(entity);
                    await _dbContext.SaveChangesAsync();

                    var subject = "Verify your email - Sillage";
                    var message = $"<p>Hello,</p><p>Thank you for registering. Your verification code is: <strong>{code}</strong>.</p><p>It expires in 10 minutes. Enter this code to confirm your email and complete registration.</p><p>If you did not create an account, please ignore this email.</p><p>— Sillage</p>";

                    try
                    {
                        await _emailSender.SendEmailAsync(model.Email, subject, message);
                    }
                    catch (Exception)
                    {
                        ModelState.AddModelError(string.Empty, "We could not send the verification code to your email. Please try again later.");
                        return View(model);
                    }

                    return RedirectToAction(nameof(VerifyEmailConfirmation), new { email = model.Email });
                }

                TempData["RegisterSuccess"] = "Registration successful. Please sign in.";
                return RedirectToAction(nameof(Login));
            }
            foreach (var error in result.Errors)
            {
                var message = error.Code switch
                {
                    "DuplicateUserName" or "DuplicateEmail" => "This email address is already registered. Each email can only be used for one account. Please sign in or use Forgot Password.",
                    _ => error.Description
                };
                ModelState.AddModelError(string.Empty, message);
            }
            return View(model);
        }
        catch (Exception)
        {
            ModelState.AddModelError(string.Empty, "An error occurred. Please try again.");
            return View(model);
        }
    }

    // --------------------------- Verify Email Confirmation
    [HttpGet]
    public IActionResult VerifyEmailConfirmation(string? email)
    {
        if (string.IsNullOrWhiteSpace(email))
        {
            TempData["VerifyEmailMessage"] = "Please complete registration first to receive a verification code.";
            return RedirectToAction(nameof(Register));
        }
        var model = new VerifyCodeVM { Email = email };
        return View(model);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> VerifyEmailConfirmation(VerifyCodeVM model)
    {
        if (!ModelState.IsValid)
        {
            return View(model);
        }

        var user = await _serviceManager.UserService.FindByEmailAsync(model.Email);
        if (user == null)
        {
            ModelState.AddModelError(string.Empty, "Invalid code.");
            return View(model);
        }

        var codeHash = PasswordResetService.HashCode(model.Code);

        var record = await _dbContext.EmailConfirmationCodes
            .Where(x => x.UserId == user.Id &&
            !x.Used && x.ExpiresAtUtc > DateTime.UtcNow)
            .OrderByDescending(x => x.Id)
            .FirstOrDefaultAsync();

        if (record == null || record.CodeHash != codeHash)
        {
            ModelState.AddModelError(string.Empty, "Invalid or expired code.");
            return View(model);
        }

        record.Used = true;
        user.EmailConfirmed = true;
        await _dbContext.SaveChangesAsync();
        await _userManager.UpdateAsync(user);

        TempData["RegisterSuccess"] = "Email verified successfully. Please sign in.";
        return RedirectToAction(nameof(Login));
    }

    // --------------------------- UpdateProfileImage
    [HttpPost]
    public async Task<IActionResult> UpdateProfileImage(IFormFile ProfileImage)
    {
        if (ProfileImage == null)
            return BadRequest();

        var fileName = Guid.NewGuid() + Path.GetExtension(ProfileImage.FileName);

        var path = Path.Combine(Directory.GetCurrentDirectory(),
                                "wwwroot/Images/Trainee",
                                fileName);

        using (var stream = new FileStream(path, FileMode.Create))
        {
            await ProfileImage.CopyToAsync(stream);
        }

        var imagePath = "/Images/Trainee/" + fileName;

        // حدث المسار في الداتابيز هنا
        // user.ImagePath = imagePath;
        // await _userManager.UpdateAsync(user);

        return Json(new { imagePath });
    }



    // --------------------------- UpdateProfileImage
    [HttpPost]
    public async Task<IActionResult> UpdateProfileImage(int id, IFormFile ProfileImage)
    {
        if (ProfileImage == null)
            return BadRequest();

        var imagePath = await _serviceManager.UserService.EditImageAsync(id, ProfileImage);

        var idStr = Request.Cookies["Id"];
        if (!string.IsNullOrEmpty(idStr) && idStr == id.ToString())
        {
            var options = new CookieOptions
            {
                HttpOnly = true,
                IsEssential = true,
                Secure = false,
                SameSite = SameSiteMode.Lax,
                Expires = DateTimeOffset.UtcNow.AddDays(7)
            };
            Response.Cookies.Append("ImagePath", imagePath ?? "", options);
        }

        return Json(new { imagePath });
    }


    // --------------------------- Logout
    public async Task<IActionResult> Logout()
    {
        try
        {
            Response.Cookies.Delete("Id");
            Response.Cookies.Delete("Role");
            Response.Cookies.Delete("Name");
            Response.Cookies.Delete("Email");
            Response.Cookies.Delete("ImagePath");

            return RedirectToAction(nameof(Login), "Account");
        }
        catch (Exception)
        {

            throw;
        }
    }

    // --------------------------- Profile
    [HttpGet]
    public async Task<IActionResult> Profile()
    {
        var idStr = Request.Cookies["Id"];
        if (string.IsNullOrEmpty(idStr) || !int.TryParse(idStr, out var userId))
            return RedirectToAction(nameof(Login));

        var user = await _userManager.FindByIdAsync(userId.ToString());
        if (user == null)
            return RedirectToAction(nameof(Login));

        ViewBag.UserName = user.UserName ?? user.Email;
        ViewBag.Email = user.Email;
        ViewBag.ImagePath = user.ImagePath;
        return View();
    }

    // --------------------------- Forgot Password
    [HttpGet]
    public IActionResult ForgotPassword()
    {
        return View();
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> ForgotPassword(ForgotPasswordVM model)
    {
        if (!ModelState.IsValid)
        {
            return View(model);
        }

        var user = await _serviceManager.UserService.FindByEmailAsync(model.Email);

        if (user != null)
        {
            var code = PasswordResetService.GenerateNumericCode();
            var codeHash = PasswordResetService.HashCode(code);

            var entity = new PasswordResetCode
            {
                UserId = user.Id,
                CodeHash = codeHash,
                ExpiresAtUtc = DateTime.UtcNow.AddMinutes(10),
                Used = false
            };

            _dbContext.PasswordResetCodes.Add(entity);
            await _dbContext.SaveChangesAsync();

            var subject = "Your password reset code - Sillage";
            var message = $"<p>Hello,</p><p>Your verification code is: <strong>{code}</strong>.</p><p>It expires in 10 minutes. Enter this code on the Verify Code page to reset your password.</p><p>If you did not request this, please ignore this email.</p><p>— Sillage</p>";

            try
            {
                await _emailSender.SendEmailAsync(model.Email, subject, message);
            }
            catch (Exception)
            {
                ModelState.AddModelError(string.Empty, "We could not send the verification code to your email. Please check your email address and try again. If the problem persists, ensure your SMTP settings are correct.");
                return View(model);
            }

            TempData["CodeSentTo"] = model.Email;
            return RedirectToAction(nameof(VerifyCode), new { email = model.Email });
        }

        // Do not reveal whether the email exists or not
        return RedirectToAction(nameof(ForgotPasswordConfirmation));
    }

    public IActionResult ForgotPasswordConfirmation()
    {
        return View();
    }


    // --------------------------- Verify Code
    [HttpGet]
    public IActionResult VerifyCode(string? email)
    {
        if (string.IsNullOrWhiteSpace(email))
        {
            TempData["VerifyCodeMessage"] = "Please enter your email on the Forgot Password page first to receive a verification code.";
            return RedirectToAction(nameof(ForgotPassword));
        }
        var model = new VerifyCodeVM { Email = email };
        return View(model);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> VerifyCode(VerifyCodeVM model)
    {
        if (!ModelState.IsValid)
        {
            return View(model);
        }

        var user = await _serviceManager.UserService.FindByEmailAsync(model.Email);
        if (user == null)
        {
            ModelState.AddModelError(string.Empty, "Invalid code.");
            return View(model);
        }

        var codeHash = PasswordResetService.HashCode(model.Code);

        var record = await _dbContext.PasswordResetCodes
            .Where(x => x.UserId == user.Id && !x.Used && x.ExpiresAtUtc > DateTime.UtcNow)
            .OrderByDescending(x => x.Id)
            .FirstOrDefaultAsync();

        if (record == null || record.CodeHash != codeHash)
        {
            ModelState.AddModelError(string.Empty, "Invalid or expired code.");
            return View(model);
        }

        record.Used = true;
        await _dbContext.SaveChangesAsync();

        return RedirectToAction(nameof(ResetPassword),
            new { email = model.Email, code = model.Code });
    }


    // --------------------------- Reset Password
    [HttpGet]
    public IActionResult ResetPassword(string? email, string? code)
    {
        if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(code))
        {
            TempData["ResetPasswordMessage"] = "Please verify your code first to reset your password.";
            return RedirectToAction(nameof(ForgotPassword));
        }
        var model = new ResetPasswordVM
        {
            Email = email,
            Code = code
        };

        return View(model);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> ResetPassword(ResetPasswordVM model)
    {
        if (!ModelState.IsValid)
        {
            return View(model);
        }

        var user = await _serviceManager.UserService.FindByEmailAsync(model.Email);
        if (user == null)
        {
            return RedirectToAction(nameof(ResetPasswordConfirmation));
        }

        var resetToken = await _userManager.GeneratePasswordResetTokenAsync(user);
        var result = await _userManager.ResetPasswordAsync(user, resetToken, model.NewPassword);

        if (result.Succeeded)
        {
            return RedirectToAction(nameof(ResetPasswordConfirmation));
        }

        foreach (var error in result.Errors)
        {
            ModelState.AddModelError(string.Empty, error.Description);
        }

        return View(model);
    }

    public IActionResult ResetPasswordConfirmation()
    {
        return View();
    }
}
