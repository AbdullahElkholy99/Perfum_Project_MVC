using Perfum.Services.IServices.PaymentMethods;
using Perfum.Services.IServices.Users;

namespace Perfum.Services.Services.ManagerService;

public class ServiceManager : IServiceManager
{
    public ICategoryService CategoryService { get; }
    public IProductService ProductService { get; }
    #region Auth
    public IUserService UserService { get; }
    public IRoleService RoleService { get; }

    #endregion
    public IOrderService OrderService { get; }
    public IOrderItemService OrderItemService { get; }

    #region Users

    public ICustomerService CustomerService { get; }

    #endregion

    #region Payment Methods
    public IStripePaymentService StripePaymentService { get; }

    #endregion
    public ServiceManager(ICategoryService categoryService, IProductService productService,
                            IRoleService roleService, IUserService userService,
                            IOrderItemService orderItemService, IOrderService orderService,
                            ICustomerService customerService, IStripePaymentService stripePaymentService)
    {
        #region Auth
        RoleService = roleService;
        UserService = userService;
        #endregion

        CategoryService = categoryService;
        ProductService = productService;
        OrderService = orderService;
        OrderItemService = orderItemService;

        #region Users
        CustomerService = customerService;
        #endregion

        #region Payment Methods
        StripePaymentService = stripePaymentService;
        #endregion
    }
}
