
namespace Perfum.Repositories.IRepository.Users;

public interface ICustomerRepository : IGenericRepository<Customer>
{
    //--------------------- Read
    Task<Customer> GetCustomerByEmailAsync(string email);
}
