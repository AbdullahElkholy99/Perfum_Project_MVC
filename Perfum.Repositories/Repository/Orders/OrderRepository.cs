

namespace Perfum.Repositories.Repository.Orders;

public class OrderRepository : GenericRepository<Order>, IOrderRepository
{
    public OrderRepository(AppDbContext dbContext) : base(dbContext)
    {
    }

    public IQueryable<Order> GetOrdersForCustomerAsync(int customerId)
    {
        return _dbContext.Set<Order>().Where(order => order.CustomerId == customerId).AsNoTracking().AsQueryable();
    }
}

