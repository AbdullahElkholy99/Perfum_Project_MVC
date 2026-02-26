
namespace Perfum.Services.Services.Authentication;

public class RoleService : IRoleService
{
    private readonly RoleManager<IdentityRole<int>> _roleManager;
    private readonly UserManager<User> _userManager;

    public RoleService(RoleManager<IdentityRole<int>> roleManager,
        UserManager<User> userManager)
    {
        _roleManager = roleManager;
        _userManager = userManager;
    }

    // ------------------- Create
    public async Task<IdentityResult> CreateRoleAsync(string roleName)
    {
        if (await _roleManager.RoleExistsAsync(roleName))
            return IdentityResult.Failed(
                new IdentityError { Description = "Role already exists" });

        var role = new IdentityRole<int>(roleName);
        return await _roleManager.CreateAsync(role);
    }
    public async Task<IdentityResult> AddToRolesAsync(User user, List<string> roles)
    {
        return await _userManager.AddToRolesAsync(user, roles);
    }
    public async Task<IdentityResult> CreateRoleWithClaimsAsync(AddClaimsToRoleVM model)
    {
        try
        {
            var resultRole = await CreateRoleAsync(model.Role);

            if (!resultRole.Succeeded)
            {
                return resultRole;
            }
            var role = await _roleManager.FindByNameAsync(model.Role);

            foreach (var claim in model.Permissions)
            {
                var resultClaim = await _roleManager.AddClaimAsync(role, new Claim(claim, claim));
                if (!resultClaim.Succeeded)
                {
                    return resultClaim;
                }
            }
            return IdentityResult.Success;
        }
        catch (Exception)
        {

            throw;
        }
    }
    // ------------------- Check
    public async Task<IdentityResult> AddClaimToRoleAsync(string role, List<Claim> claims)
    {
        foreach (var claim in claims)
        {
            var result = await _roleManager.AddClaimAsync(
                 await _roleManager.FindByNameAsync(role),
                 new Claim(claim.Type, claim.Value));

            if (result.Succeeded == false)
            {
                return result;
            }
        }
        return IdentityResult.Success;
    }
    public async Task<bool> RoleExistsAsync(string roleName)
    {
        return await _roleManager.RoleExistsAsync(roleName);
    }

    // ------------------- Read
    public async Task<List<IdentityRole<int>>> GetAllRolesAsync()
    {
        return await _roleManager.Roles.ToListAsync();
    }
    public async Task<IList<string>> GetRolesAsync(User user)
    {
        return await _userManager.GetRolesAsync(user);
    }
    public async Task<List<RoleWithClaimsVM>> GetAllRolesWithClaimsAsync()
    {
        var roles = await _roleManager.Roles.ToListAsync();

        var result = new List<RoleWithClaimsVM>();

        var totalPermissions = typeof(Permissions)
                                        .GetFields(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static)
                                        .Length;

        foreach (var role in roles)
        {
            var claims = await _roleManager.GetClaimsAsync(role);

            var permissionClaims = claims
                .Where(c => c.Type == "Permission")
                .Select(c => c.Value)
                .ToList();

            var users = await _userManager.GetUsersInRoleAsync(role.Name);

            result.Add(new RoleWithClaimsVM
            {
                Id = role.Id,
                Name = role.Name,
                Claims = permissionClaims,
                UsersCount = users.Count,
                PremissionsCount = permissionClaims.Count,
                TotalPermissions = totalPermissions
            });
        }

        return result;
    }
    // ------------------- Delete
    public async Task<IdentityResult> DeleteRoleAsync(int id)
    {
        var role = await _roleManager.FindByIdAsync(id.ToString());
        if (role == null)
            return IdentityResult.Failed(
                new IdentityError { Description = "Role not found" });

        return await _roleManager.DeleteAsync(role);
    }


    public Task<List<User>> GetAllUsersForSpecificRoleAsync(List<string> roles)
    {
        throw new NotImplementedException();
    }



}