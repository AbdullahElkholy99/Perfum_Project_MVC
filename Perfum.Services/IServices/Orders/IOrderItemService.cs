
namespace Perfum.Services.IServices.Orders;

public interface IOrderItemService
{
    // --------------------- Create ---------------------
    Task<string> AddAsync(AddOrderItemVM model);

    // --------------------- Read ---------------------
    Task<List<OrderItemVM>> GetAllByOrderIdAsync(int orderId);
    Task<OrderItemVM> GetByIdAsync(int id);
    Task<List<OrderItemWithProductDetailsVM>> GetAllOrderItemsByOrderIdAsync(int orderId);

    // --------------------- Update ---------------------
    Task<string> UpdateAsync(int id, EditOrderItemVM model);

    // --------------------- Delete ---------------------
    Task<string> DeleteAsync(int id);
}
