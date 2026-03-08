namespace Perfum.Repositories.IRepository.MangerRepository;

public interface IRepositoryManager
{
    ICategoryRepository CategoryRepository { get; }
    IProductRepository ProductRepository { get; }

    #region Orders

    IOrderRepository OrderRepository { get; }
    IOrderItemRepository OrderItemRepository { get; }

    #endregion

    #region Users
    ICustomerRepository CustomerRepository { get; }

    #endregion
    #region Pyment MEthods : 
    //ICustomerBasketRepositry CustomerBasketRepositry { get; }
    #endregion
}
