
namespace Perfum.Services.IServices.Users;

public interface ICustomerService
{
    // --------------------- Create ---------------------
    Task<string> AddAsync(AddCustomerVM model);

    // --------------------- Read ---------------------
    Task<PagedResult<CustomerVM, CustomersFilter, DashBoardCustomer>> GetAllAsync(CustomersFilter? filter);

    Task<CustomerVM> GetByIdAsync(int id);

    Task<CustomerVM> GetByEmailAsync(string email);

    // --------------------- Update ---------------------
    Task<string> UpdateAsync(int id, EditCustomerVM model);

    // --------------------- Delete ---------------------
    Task<string> DeleteAsync(int id);
}
