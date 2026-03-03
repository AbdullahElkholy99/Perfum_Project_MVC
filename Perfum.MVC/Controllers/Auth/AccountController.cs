
namespace Perfum.MVC.Controllers.Auth;

public class AccountController : Controller
{
    private readonly IServiceManager _serviceManager;

    public AccountController(IServiceManager serviceManager)
    {
        _serviceManager = serviceManager;
    }

    public IActionResult Login()
    {
        var id = Request.Cookies["Id"];
        var role = Request.Cookies["Role"];

        if (id == null || role == null)
            return View();

        if (role == "Admin")
            return RedirectToAction("Index", "Admin");

        else if (role == "Customer")
            return RedirectToAction("Index", "Customer");


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
        if (result.Result) // success 
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
            Response.Cookies.Append("Role", roles[0], options);


            // Example: Redirect based on role
            if (roles.Contains("Customer"))
                return RedirectToAction("Index", "Customer");

            else if (roles.Contains("Admin"))
                return RedirectToAction("Index", "Admin");

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

                return RedirectToAction(nameof(Login), "Account");
            }
            return View(model);
        }
        catch (Exception)
        {
            return View(model);

            throw;
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

            return RedirectToAction(nameof(Login), "Account");
        }
        catch (Exception)
        {

            throw;
        }
    }
}
