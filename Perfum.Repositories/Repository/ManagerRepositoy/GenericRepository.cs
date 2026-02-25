
namespace Perfum.Repositories.Repository.ManagerRepositoy;


public class GenericRepository<T> : IGenericRepository<T> where T : class
{

    #region Vars / Props

    protected readonly AppDbContext _dbContext;

    #endregion

    #region Constructor
    public GenericRepository(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    #endregion

    #region Methods

    // -------------------- Create
    public virtual async Task AddRangeAsync(ICollection<T> entities)
    {
        await _dbContext.Set<T>().AddRangeAsync(entities);
        await _dbContext.SaveChangesAsync();

    }
    public virtual async Task<T> AddAsync(T entity)
    {
        await _dbContext.Set<T>().AddAsync(entity);
        await _dbContext.SaveChangesAsync();

        return entity;
    }
    // -------------------- Read
    public virtual async Task<T> GetByIdAsync(int id)
    {

        return await _dbContext.Set<T>().FindAsync(id);
    }
    public virtual async Task<int> countAsync()
    {
        return await _dbContext.Set<T>().CountAsync();
    }

    public IQueryable<T> GetTableNoTracking()
    {
        return _dbContext.Set<T>().AsNoTracking().AsQueryable();
    }
    //public async Task<T> GetByIdAsync<T>( int id,params Expression<Func<T, object>>[] includes)  
    //{
    //    IQueryable<T> query = _dbContext.Set<T>();

    //    foreach (var include in includes)
    //        query = query.Include(include);

    //    return await query.FirstOrDefaultAsync(e =>
    //        EF.Property<int>(e, "Id") == id);
    //}


    // -------------------- Update
    public virtual async Task UpdateAsync(T entity)
    {
        _dbContext.Set<T>().Update(entity);
        await _dbContext.SaveChangesAsync();

    }
    public virtual async Task UpdateRangeAsync(ICollection<T> entities)
    {
        _dbContext.Set<T>().UpdateRange(entities);
        await _dbContext.SaveChangesAsync();
    }

    // -------------------- Delete
    public virtual async Task DeleteAsync(T entity)
    {
        _dbContext.Set<T>().Remove(entity);
        await _dbContext.SaveChangesAsync();
    }
    public virtual async Task DeleteRangeAsync(ICollection<T> entities)
    {
        foreach (var entity in entities)
        {
            _dbContext.Entry(entity).State = EntityState.Deleted;
        }
        await _dbContext.SaveChangesAsync();
    }

    // -------------------- Save Changes
    public async Task SaveChangesAsync()
    {
        await _dbContext.SaveChangesAsync();
    }

    // -------------------- Transaction
    public IDbContextTransaction BeginTransaction()
    {
        return _dbContext.Database.BeginTransaction();
    }

    public void Commit()
    {
        _dbContext.Database.CommitTransaction();
    }

    public void RollBack()
    {
        _dbContext.Database.RollbackTransaction();
    }

    public IQueryable<T> GetTableAsTracking()
    {
        return _dbContext.Set<T>().AsQueryable();
    }


    #endregion
}
