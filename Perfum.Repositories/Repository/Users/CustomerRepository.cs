

namespace Perfum.Repositories.Repository.Users;

public class CustomerRepository : GenericRepository<Customer>, ICustomerRepository
{

    public CustomerRepository(AppDbContext dbContext) : base(dbContext)
    {
        
    }


    public virtual async Task<Customer> GetCustomerByEmailAsync(string email)
    {
        return await _dbContext.Customers.SingleOrDefaultAsync(c => c.Email == email);
    }
}
