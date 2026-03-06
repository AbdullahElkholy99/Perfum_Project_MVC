namespace Perfum.Services.IServices.Users;

public interface ICustomerService
{

    Task<Customer> GetAllAsync(Customer customer);
}
