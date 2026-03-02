namespace Perfum.Services.IServices.ManagerService;

public interface IServiceManager
{
    public IUserService UserService { get; }
    public IRoleService RoleService { get; }

    ICategoryService CategoryService { get; }

}
