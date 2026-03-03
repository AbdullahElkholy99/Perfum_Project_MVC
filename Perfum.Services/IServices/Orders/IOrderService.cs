using Perfum.Services.ViewModels.OrderVM;
using Perfum.Services.ViewModels.Paginations;

namespace Perfum.Services.IServices.Orders;

public interface IOrderService
{
    // --------------------- Create ---------------------
    Task<string> AddAsync(AddOrderVM model);

    // --------------------- Read ---------------------
    Task<PagedResult<OrderVM, OrderFilter, DashBoardOrder>> GetAllAsync();
    Task<OrderVM> GetByIdAsync(int id);

    // --------------------- Update ---------------------
    Task<string> UpdateAsync(int id, EditOrderVM model);

    // --------------------- Delete ---------------------
    Task<string> DeleteAsync(int id);
}
