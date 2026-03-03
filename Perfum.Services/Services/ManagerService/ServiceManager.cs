using Perfum.Services.IServices.Orders;

namespace Perfum.Services.Services.ManagerService;

public class ServiceManager : IServiceManager
{
    public ICategoryService CategoryService { get; }
    public IProductService ProductService { get; }
    public IUserService UserService { get; }
    public IRoleService RoleService { get; }

    public IOrderService OrderService { get; }
    public IOrderItemService OrderItemService { get; }

    public ServiceManager(ICategoryService categoryService, IProductService productService,
                            IRoleService roleService, IUserService userService,
                            IOrderItemService orderItemService, IOrderService orderService)
    {
        RoleService = roleService;
        CategoryService = categoryService;
        ProductService = productService;
        RoleService = roleService;
        UserService = userService;
        OrderService = orderService;
        OrderItemService = orderItemService;
    }
}
