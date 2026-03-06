<<<<<<< HEAD
﻿
namespace Perfum.Services.IServices.Users;

public interface ICustomerService
{
    // --------------------- Create ---------------------
    Task<string> AddAsync(AddCustomerVM model);

    // --------------------- Read ---------------------
    Task<PagedResult<CustomerVM, ViewModels.UserVM.CustomersFilter, DashBoardCustomer>> GetAllAsync(CustomersFilter? filter);
    Task<CustomerVM> GetByIdAsync(int id);

    Task<CustomerVM> GetByEmailAsync(string email);

    // --------------------- Update ---------------------
    Task<string> UpdateAsync(int id, EditCustomerVM model);

    // --------------------- Delete ---------------------
    Task<string> DeleteAsync(int id);
=======
﻿namespace Perfum.Services.IServices.Users;

public interface ICustomerService
{

    Task<Customer> GetAllAsync(Customer customer);
>>>>>>> 8dee4014fe6596003dadc632b51af84721b68726
}
