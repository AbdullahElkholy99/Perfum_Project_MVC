
namespace Perfum.Repositories.Repository.ManagerRepositoy;

public sealed class RepositoryManager : IRepositoryManager
{
    private readonly AppDbContext _context;

    private readonly ICategoryRepository _categoryRepository;
    private readonly IProductRepository _productRepository;
    private readonly IOrderRepository _orderRepository;
    private readonly IOrderItemRepository _orderItemRepository;
    private readonly ICustomerRepository _customerRepository;

    public RepositoryManager(AppDbContext context)
    {
        _context = context;
        _categoryRepository = new CategoryRepository(_context);
        _productRepository = new ProductRepository(_context);
        _orderRepository = new OrderRepository(_context);
        _orderItemRepository = new OrderItemRepository(_context);
        _customerRepository = new CustomerRepository(_context);
    }

    public ICategoryRepository CategoryRepository => _categoryRepository;

    public IProductRepository ProductRepository => _productRepository;


    // For Orders
    public IOrderRepository OrderRepository => _orderRepository;
    public IOrderItemRepository OrderItemRepository => _orderItemRepository;

    // For Users
    public ICustomerRepository CustomerRepository => _customerRepository;
}
