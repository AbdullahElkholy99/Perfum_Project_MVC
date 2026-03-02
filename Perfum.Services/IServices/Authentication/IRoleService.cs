
namespace Perfum.Services.IServices.Authentication;

public interface IRoleService
{
    // ------------------- Create
    Task<IdentityResult> CreateRoleAsync(string roleName);
    Task<IdentityResult> CreateRoleWithClaimsAsync(AddClaimsToRoleVM model);
    Task<IdentityResult> AddClaimToRoleAsync(string role, List<Claim> claims);
    Task<IdentityResult> AddToRolesAsync(User user, List<string> roles);

    // ------------------- Read
    Task<bool> RoleExistsAsync(string roleName);
    Task<List<IdentityRole<int>>> GetAllRolesAsync();
    Task<List<RoleWithClaimsVM>> GetAllRolesWithClaimsAsync();
    Task<List<User>> GetAllUsersForSpecificRoleAsync(List<string> roles);
    Task<IList<string>> GetRolesAsync(User user);
    Task<AddClaimsToRoleVM> GetRoleWithClaimsAsync(int id);

    // ------------------- Update

    // ------------------- Delete
    Task<IdentityResult> DeleteRoleAsync(int id);
}
