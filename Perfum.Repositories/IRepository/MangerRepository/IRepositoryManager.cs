
using Perfum.Repositories.IRepository.Users;

namespace Perfum.Repositories.IRepository.MangerRepository;

public interface IRepositoryManager
{
    ICategoryRepository CategoryRepository { get; }
    IProductRepository ProductRepository { get; }
    
    IOrderRepository OrderRepository { get; }
    IOrderItemRepository OrderItemRepository { get; }

    ICustomerRepository CustomerRepository { get; }

}
