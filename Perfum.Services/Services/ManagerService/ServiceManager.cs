namespace Perfum.Services.Services.ManagerService;

public class ServiceManager : IServiceManager
{
    public ICategoryService CategoryService { get; }
    public IUserService UserService { get; }
    public IRoleService RoleService { get; }
    public ServiceManager(
        IUserService userService,
        IRoleService roleService,
        ICategoryService categoryService)
    {
        UserService = userService;
        RoleService = roleService;
        CategoryService = categoryService;
    }
}
