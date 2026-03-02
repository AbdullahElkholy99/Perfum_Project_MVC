using Perfum.Services.Services.Authentication;

namespace Perfum.Services.Services.ManagerService;

public class ServiceManager : IServiceManager
{
    public ICategoryService CategoryService { get; }
    public IProductService ProductService { get; }
    public IUserService UserService { get; }
    public IRoleService RoleService { get; }

    public ServiceManager(ICategoryService categoryService, IProductService productService, IRoleService roleService, IUserService userService)
    {
        RoleService = roleService;
        CategoryService = categoryService;
        ProductService = productService;
        RoleService = roleService;
        UserService = userService;
    }
}
