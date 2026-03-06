
namespace Perfum.Services.IServices.Users;

public interface ICustomerService
{
    // --------------------- Create ---------------------
    Task<string> AddAsync(AddCustomerVM model);

    // --------------------- Read ---------------------
    Task<PagedResult<CustomerVM, ViewModels.UserVM.CustomersFilter, DashBoardCustomer>> GetAllAsync(CustomersFilter? filter);
    Task<CustomerVM> GetByIdAsync(int id);
    Task<Customer> GetAllAsync(Customer customer);

    Task<CustomerVM> GetByEmailAsync(string email);

    // --------------------- Update ---------------------
    Task<string> UpdateAsync(int id, EditCustomerVM model);

    // --------------------- Delete ---------------------
    Task<string> DeleteAsync(int id);

}
