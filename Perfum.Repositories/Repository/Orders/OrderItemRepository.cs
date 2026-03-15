


namespace Perfum.Repositories.Repository.Orders;

public class OrderItemRepository : GenericRepository<OrderItem>, IOrderItemRepository
{
    public OrderItemRepository(AppDbContext dbContext) : base(dbContext)
    {
    }

    public IQueryable<OrderItem> GetAllByOrderId(int orderId)
    {
        return _dbContext.Set<OrderItem>()
            .Include(o => o.Product)
            .Where(oi => oi.OrderId == orderId)
            .AsNoTracking().AsQueryable();
    }
}
