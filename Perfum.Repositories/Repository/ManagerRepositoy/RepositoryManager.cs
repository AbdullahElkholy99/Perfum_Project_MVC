
using Perfum.Repositories.IRepository.PaymentMethods;
using Perfum.Repositories.Repository.PaymentMethods;
using StackExchange.Redis;

namespace Perfum.Repositories.Repository.ManagerRepositoy;

public sealed class RepositoryManager : IRepositoryManager
{
    private readonly AppDbContext _context;

    private readonly ICategoryRepository _categoryRepository;
    private readonly IProductRepository _productRepository;
    private readonly IOrderRepository _orderRepository;
    private readonly IOrderItemRepository _orderItemRepository;
    private readonly ICustomerRepository _customerRepository;

    #region Payment Methods 
    private readonly ICustomerBasketRepositry _customerBasketRepositry;

    #endregion
    public RepositoryManager(AppDbContext context, IConnectionMultiplexer redis)
    {
        _context = context;
        _categoryRepository = new CategoryRepository(_context);
        _productRepository = new ProductRepository(_context);

        #region Orders
        _orderRepository = new OrderRepository(_context);
        _orderItemRepository = new OrderItemRepository(_context);

        #endregion

        #region Users
        _customerRepository = new CustomerRepository(_context);
        #endregion

        #region Peyment Methods 
        _customerBasketRepositry = new CustomerBasketRepositry(redis);

        #endregion  
    }

    public ICategoryRepository CategoryRepository => _categoryRepository;

    public IProductRepository ProductRepository => _productRepository;


    // For Orders
    #region Orders
    public IOrderRepository OrderRepository => _orderRepository;
    public IOrderItemRepository OrderItemRepository => _orderItemRepository;

    #endregion
    // For Users
    #region Users

    public ICustomerRepository CustomerRepository => _customerRepository;

    #endregion

    #region  Peyment Methods 
    public ICustomerBasketRepositry CustomerBasketRepositry => _customerBasketRepositry;

    #endregion


}
