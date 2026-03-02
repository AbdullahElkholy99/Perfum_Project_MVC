namespace Perfum.MVC.Controllers.Auth;

public class RoleController : Controller
{
    private readonly IServiceManager _serviceManager;
    private readonly IMapper _mapper;

    public RoleController(IServiceManager serviceManager, IMapper mapper)
    {
        _serviceManager = serviceManager;
        _mapper = mapper;
    }

    public async Task<IActionResult> Index()
    {
        try
        {
            List<RoleWithClaimsVM>? rolesWithClaims = await _serviceManager.RoleService.GetAllRolesWithClaimsAsync();

            if (rolesWithClaims == null || !rolesWithClaims.Any())
            {
                return View("NoRolesFound");
            }

            return View(rolesWithClaims);
        }
        catch (Exception)
        {

            throw;
        }
    }

    // --------------------------------------- Add
    [HttpGet]
    public async Task<IActionResult> Add()
    {
        return PartialView("_AddOrEditRoleModal");
    }
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Add(AddClaimsToRoleVM modal)
    {
        if (!ModelState.IsValid)
        {
            var errors = ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
                .ToList();

            return BadRequest(errors);
        }
        try
        {
            if (modal == null)
                return PartialView("_AddOrEditRoleModal", modal);


            var result = await _serviceManager.RoleService.CreateRoleWithClaimsAsync(modal);

            return RedirectToAction(nameof(Index));
        }
        catch (Exception ex)
        {

            throw;
        }
    }

    // --------------------------------------- EDit : 

    [HttpGet]
    public async Task<IActionResult> Edit(int id) // open model for update
    {
        AddClaimsToRoleVM? roleWithClaims = await _serviceManager.RoleService.GetRoleWithClaimsAsync(id);

        if (roleWithClaims == null)
            return NotFound();

        return PartialView("_AddOrEditRoleModal", roleWithClaims);
    }

    // --------------------------------------- Delete
    public async Task<IActionResult> Delete(int id)
    {
        return PartialView("_DeleteRoleModal", id);

    }
    [HttpPost]
    public async Task<IActionResult> DeleteConfirmed(int id)
    {
        var result = await _serviceManager.RoleService.DeleteRoleAsync(id);

        if (!result.Succeeded)
            return Json(new
            {
                success = result.Succeeded
            });

        return RedirectToAction(nameof(Index));

    }
}
