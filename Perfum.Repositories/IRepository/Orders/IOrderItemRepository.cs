
namespace Perfum.Repositories.IRepository.Orders;

public interface IOrderItemRepository : IGenericRepository<OrderItem>
{
    // -------------------- Read ---------------------
    IQueryable<OrderItem> GetAllByOrderId(int orderId);
}
