using Perfum.Services.IServices.Orders;

namespace Perfum.Services.IServices.ManagerService;

public interface IServiceManager
{
    public IUserService UserService { get; }
    public IRoleService RoleService { get; }

    public ICategoryService CategoryService { get; }
    public IProductService ProductService { get; }

    public IOrderService OrderService { get; }
    public IOrderItemService OrderItemService { get; }
}
