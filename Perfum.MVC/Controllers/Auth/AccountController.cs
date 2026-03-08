
using Microsoft.EntityFrameworkCore;
using Perfum.Services.Services.Authentication;

namespace Perfum.MVC.Controllers.Auth;

public class AccountController : Controller
{
    private readonly IServiceManager _serviceManager;
    private readonly AppDbContext _dbContext;
    private readonly IEmailSender _emailSender;
    private readonly UserManager<User> _userManager;

    public AccountController(IServiceManager serviceManager,
                             AppDbContext dbContext,
                             IEmailSender emailSender,
                             UserManager<User> userManager)
    {
        _serviceManager = serviceManager;
        _dbContext = dbContext;
        _emailSender = emailSender;
        _userManager = userManager;
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
        if (result.Result) 
        {

            var roles = result.Roles;

            var options = new CookieOptions
            {
                HttpOnly = true,
                IsEssential = true,
                Secure = false,
                SameSite = SameSiteMode.Lax,
                Expires = DateTimeOffset.UtcNow.AddDays(7)
            };

            Response.Cookies.Append("Id", result.Id.ToString(), options);
            Response.Cookies.Append("Email", result.Email, options);
            Response.Cookies.Append("Name", result.UserName, options);
            Response.Cookies.Append("ImagePath", result.ImagePath ?? "", options);
            Response.Cookies.Append("Role", roles[0], options);


            // Redirect: Customer -> Home
            //Admin -> Customer controller
            if (roles.Contains("Admin"))
                return RedirectToAction("Index", "Customer");

            if (roles.Contains("Customer"))
                return RedirectToAction("Index", "Home");

            return RedirectToAction("Index", "Home");
        }

        ModelState.AddModelError("", "Invalid Login");
        return View(model);
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
