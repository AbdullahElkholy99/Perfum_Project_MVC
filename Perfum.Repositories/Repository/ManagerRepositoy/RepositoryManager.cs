namespace Perfum.Repositories.Repository.ManagerRepositoy;

public sealed class RepositoryManager : IRepositoryManager
{

    private readonly AppDbContext _context;

    private readonly ICategoryRepository _categoryRepository;

    public RepositoryManager(AppDbContext context)
    {
        _context = context;
        _categoryRepository = new CategoryRepository(_context);
    }

    public ICategoryRepository CategoryRepository => _categoryRepository;
}
