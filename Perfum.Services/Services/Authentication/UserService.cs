
namespace Perfum.Services.Services.Authentication;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Perfum.MVC.Services;
using System.Security.Claims;

public class UserService : IUserService
{
    #region Fields
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;
    public readonly IMapper _mapper;
    public readonly IRoleService _roleService;
    public readonly IFileService _fileService;

    #endregion

    #region CTOR
    public UserService(UserManager<User> userManager, SignInManager<User> signInManager, IMapper mapper, IRoleService roleService, IFileService fileManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _mapper = mapper;
        _roleService = roleService;
        _fileService = fileManager;
    }
    #endregion

    #region Method Handlers 

    // ------------------- Create
    public async Task<IdentityResult> CreateAsync(User user, string password)
    {
        return await _userManager.CreateAsync(user, password);
    }
    public async Task<IdentityResult> RegisterAsync(RegisterVM model)
    {
        // begin transaction 
        try
        {
            var user = _mapper.Map<Customer>(model);

            var registerResult = await _userManager.CreateAsync(user, model.Password);

            if (!registerResult.Succeeded)
            {
                return registerResult;
            }

            var roles = new List<string> { "Customer" };
            var roleResult = await _roleService.AddToRolesAsync(user, roles);
            if (!roleResult.Succeeded)
            {
                await _userManager.DeleteAsync(user);
                return roleResult;
            }

            return IdentityResult.Success;

        }
        catch (Exception ex)
        {

            throw;
        }
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
    public async Task<string> EditImageAsync(int id, IFormFile imageFile)
    {
        try
        {
            var user = await FindByIdAsync(id);
            if (user == null)
                return string.Empty;

            var roles = await _roleService.GetRolesAsync(user);
            if (roles == null)
                return string.Empty;
            ;

            var pathImage = await _fileService.SaveImageAsync(imageFile, $"Images/{roles[0]}");

            if (pathImage == null)
                return string.Empty;

            if (user.ImagePath != null)
                _fileService.DeleteImage(user.ImagePath);

            user.ImagePath = pathImage;

            await _userManager.UpdateAsync(user);

            return pathImage;
        }
        catch (Exception ex)
        {

            throw new Exception(ex.Message);
        }

    }
    // ------------------- Delete
    public async Task<IdentityResult> DeleteAsync(User user)
    {
        return await _userManager.DeleteAsync(user);
    }

    public async Task<LoginResultVM> IsAuthenticate(LoginVM model)
    {
        var result = new LoginResultVM
        {
            Result = false,
            Email = model.Email,
            Roles = new List<string>()
        };

        var user = await _userManager.FindByEmailAsync(model.Email);
        if (user == null)
            return result;

        var signInResult = await _signInManager.PasswordSignInAsync(
            user,
            model.Password,
            model.RememberMe,
            false);

        result.Result = signInResult.Succeeded;
        result.UserName = user.UserName ?? "unknown";
        result.Id = user.Id;
        result.ImagePath = user.ImagePath;
        result.RequiresEmailConfirmation = signInResult.IsNotAllowed;

        var Roles = await _userManager.GetRolesAsync(user);
        if (Roles != null)
            result.Roles = Roles.ToList();

        if (signInResult.Succeeded)
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
    #endregion
}