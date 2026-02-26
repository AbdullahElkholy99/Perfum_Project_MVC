namespace Perfum.Repositories.IRepository.MangerRepository;

public interface IGenericRepository<T> where T : class
{

    // -------------------- Create
    Task<T> AddAsync(T entity);
    Task AddRangeAsync(ICollection<T> entities);

    // -------------------- Read
    Task<T> GetByIdAsync(int id);
    Task<int> countAsync();

    IQueryable<T> GetTableNoTracking();
    IQueryable<T> GetTableAsTracking();

    // -------------------- Update
    Task UpdateAsync(T entity);
    Task UpdateRangeAsync(ICollection<T> entities);

    // -------------------- Delete
    Task DeleteRangeAsync(ICollection<T> entities);
    Task DeleteAsync(T entity);

    // -------------------- Save Changes 
    Task SaveChangesAsync(); // .savechanges()

    // -------------------- Transaction
    IDbContextTransaction BeginTransaction();
    void Commit();
    void RollBack();
}
