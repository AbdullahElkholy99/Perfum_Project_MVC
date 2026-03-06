using Perfum.Services.IServices.PaymentMethods;
using Perfum.Services.IServices.Users;

namespace Perfum.Services.IServices.ManagerService;

public interface IServiceManager
{
    #region Auth
    public IUserService UserService { get; }
    public IRoleService RoleService { get; }

    #endregion

    public ICategoryService CategoryService { get; }
    public IProductService ProductService { get; }

    public IOrderService OrderService { get; }
    public IOrderItemService OrderItemService { get; }

    #region Users

    public ICustomerService CustomerService { get; }

    #endregion

    #region Payment Method 
    IStripePaymentService StripePaymentService { get; }
    #endregion

}
