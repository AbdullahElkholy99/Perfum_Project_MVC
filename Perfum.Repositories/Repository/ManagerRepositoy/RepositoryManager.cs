namespace Perfum.Repositories.Repository.ManagerRepositoy;

public sealed class RepositoryManager : IRepositoryManager
{
    private readonly AppDbContext _context;

    private readonly ICategoryRepository _categoryRepository;
    private readonly IProductRepository _productRepository;

    public RepositoryManager(AppDbContext context)
    {
        _context = context;
        _categoryRepository = new CategoryRepository(_context);
        _productRepository = new ProductRepository(_context);
    }

    public ICategoryRepository CategoryRepository => _categoryRepository;

    public IProductRepository ProductRepository => _productRepository;
}
