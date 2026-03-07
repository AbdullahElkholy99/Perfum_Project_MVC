
namespace Perfum.Repositories.IRepository.Orders;

public interface IOrderRepository : IGenericRepository<Order>
{
    // -------------------- Read ---------------------
    // get orders by customer id
    IQueryable<Order> GetOrdersForCustomerAsync(int customerId);
}
