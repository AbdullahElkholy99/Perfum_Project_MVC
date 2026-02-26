
namespace Perfum.Services.Services.Authentication;

using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

public class UserService : IUserService
{
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;

    public UserService(UserManager<User> userManager, SignInManager<User> signInManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
    }

    // ------------------- Create
    public async Task<IdentityResult> CreateAsync(User user, string password)
    {
        return await _userManager.CreateAsync(user, password);
    }
    public async Task<IdentityResult> AddClaimAsync(User User, List<Claim> claims)
    {
        var claimResult = await _userManager.AddClaimsAsync(User, claims);

        return claimResult;
    }

    // ------------------- Read
    public async Task<User?> FindByIdAsync(int id)
    {
        return await _userManager.FindByIdAsync(id.ToString());
    }

    public async Task<User?> FindByEmailAsync(string email)
    {
        return await _userManager.FindByEmailAsync(email);
    }

    // ------------------- Update
    public async Task<IdentityResult> UpdateAsync(User user)
    {
        return await _userManager.UpdateAsync(user);
    }

    // ------------------- Delete
    public async Task<IdentityResult> DeleteAsync(User user)
    {
        return await _userManager.DeleteAsync(user);
    }

    public async Task<LoginResultVM> IsAuthenticate(LoginVM model)
    {
        // Check if email is confirmed
        var result = new LoginResultVM
        {
            Result = false,
            Roles = new List<string>()
        };

        var user = await _userManager.FindByEmailAsync(model.Email);
        if (user == null)
        {
            return result;
        }

        // Attempt sign in
        var checkPassword = await _signInManager.CheckPasswordSignInAsync(
            user,
            model.Password,
            model.RememberMe);

        result.Result = checkPassword.Succeeded;
        if (checkPassword.Succeeded)
        {
            var roles = await _userManager.GetRolesAsync(user);
            result.Roles = roles.ToList();
        }

        return result;

    }

    public async Task<List<User>> GetAllUsersForSpecificRoleAsync(List<string> roles)
    {
        var users = new List<User>();

        foreach (var role in roles)
        {
            var usersInRole = await _userManager.GetUsersInRoleAsync(role);
            users.AddRange(usersInRole);
        }

        return users.Distinct().ToList();
    }
}