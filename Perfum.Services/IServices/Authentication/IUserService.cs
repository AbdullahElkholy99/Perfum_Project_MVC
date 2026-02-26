namespace Perfum.Services.IServices.Authentication;

public interface IUserService
{
    // ------------------- Create
    Task<IdentityResult> CreateAsync(User User, string password);
    Task<IdentityResult> AddClaimAsync(User User, List<Claim> claims);
    // ------------------- Read
    Task<User?> FindByIdAsync(int id);
    Task<User?> FindByEmailAsync(string email);
    Task<List<User>> GetAllUsersForSpecificRoleAsync(List<string> roles);
    // ------------------- Update
    Task<IdentityResult> UpdateAsync(User User);
    // ------------------- Delete
    Task<IdentityResult> DeleteAsync(User user);

    Task<LoginResultVM> IsAuthenticate(LoginVM model);

}