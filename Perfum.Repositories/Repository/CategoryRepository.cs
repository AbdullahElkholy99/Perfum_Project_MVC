

namespace Perfum.Repositories.Repository;

public class CategoryRepository : GenericRepository<Category>, ICategoryRepository
{
    public CategoryRepository(AppDbContext dbContext) : base(dbContext)
    {
    }
}

public class CatdryRepository : ICatdryRepository
{
    public CatdryRepository(AppDbContext dbContext)
    {
    }
}

public interface ICatdryRepository
{

}
