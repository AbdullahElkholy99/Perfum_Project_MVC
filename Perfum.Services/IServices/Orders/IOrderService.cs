using Perfum.Domain.Models.Orders;
using Perfum.Services.ViewModels.OrderVM;

namespace Perfum.Services.IServices.Orders;

public interface IOrderService
{
    // --------------------- Create ---------------------
    Task<string> AddAsync(AddOrderVM model);
    //by abdullah ali
    Task<Order> CreateOrdersAsync(OrderDTO orderDTO, string BuyerEmail);

    // --------------------- Read ---------------------
    Task<PagedResult<OrderVM, OrderFilter, DashBoardOrder>> GetAllAsync();
    Task<OrderVM> GetByIdAsync(int id);

    // --------------------- Update ---------------------
    Task<string> UpdateAsync(int id, EditOrderVM model);

    // --------------------- Delete ---------------------
    Task<string> DeleteAsync(int id);
}
