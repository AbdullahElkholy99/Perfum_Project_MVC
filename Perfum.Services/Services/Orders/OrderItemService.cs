
using Perfum.Domain.Models.Orders;
using Perfum.MVC.Services;
using Perfum.Services.IServices.Orders;
using Perfum.Services.ViewModels.OrderItemVM;

namespace Perfum.Services.Services.OrderItems;

public class OrderItemService : IOrderItemService
{
    #region Fields

    private readonly IRepositoryManager _repositoryManager;
    private readonly IFileService _fileService;
    private readonly IMapper _mapper;

    #endregion


    #region CTORs
    public OrderItemService(IRepositoryManager repositoryManager, IMapper mapper, IFileService fileService)
    {
        _repositoryManager = repositoryManager;
        _mapper = mapper;
        _fileService = fileService;
    }
    #endregion


    #region Helpers

    /// <summary>
    /// Recalculates and saves TotalPrice on the parent Order.
    /// </summary>
    private async Task RecalculateOrderTotalAsync(int orderId)
    {
        var order = await _repositoryManager.OrderRepository.GetByIdAsync(orderId);
        if (order == null) return;

        var items = await _repositoryManager.OrderItemRepository
                          .GetAllByOrderId(orderId)
                          .ToListAsync();

        order.TotalPrice = items.Sum(i => i.UnitPrice * i.Quantity);

        await _repositoryManager.OrderRepository.SaveChangesAsync();
    }

    #endregion


    #region Method Handlers

    // --------------------- Create ---------------------
    public async Task<string> AddAsync(AddOrderItemVM model)
    {
        using var transaction = _repositoryManager.OrderItemRepository.BeginTransaction();
        try
        {
            if (model == null) return "Fail";

            var item = _mapper.Map<OrderItem>(model);
            if (item == null) return "Fail";

            await _repositoryManager.OrderItemRepository.AddAsync(item);

            // Recalculate parent order total
            await RecalculateOrderTotalAsync(model.OrderId);

            transaction.Commit();
            return "Success";
        }
        catch
        {
            transaction.Rollback();
            return "Fail";
        }
    }


    // --------------------- Read ---------------------
    public async Task<List<OrderItemVM>> GetAllByOrderIdAsync(int orderId)
    {
        try
        {
            var items = await _repositoryManager.OrderItemRepository
                              .GetAllByOrderId(orderId)
                              .ToListAsync();

            if (items == null) return null;

            return _mapper.Map<List<OrderItemVM>>(items);
        }
        catch
        {
            return null;
        }
    }


    public async Task<OrderItemVM> GetByIdAsync(int id)
    {
        try
        {
            var item = await _repositoryManager.OrderItemRepository.GetByIdAsync(id);
            if (item == null) return new OrderItemVM();

            var vm = _mapper.Map<OrderItemVM>(item);
            return vm ?? new OrderItemVM();
        }
        catch
        {
            return new OrderItemVM();
        }
    }


    // --------------------- Update ---------------------
    public async Task<string> UpdateAsync(int id, EditOrderItemVM model)
    {
        try
        {
            var oldItem = await _repositoryManager.OrderItemRepository.GetByIdAsync(id);
            if (oldItem == null) return "Fail";

            int orderId = oldItem.OrderId;

            _mapper.Map(model, oldItem);
            await _repositoryManager.OrderItemRepository.SaveChangesAsync();

            // Recalculate parent order total
            await RecalculateOrderTotalAsync(orderId);

            return "Success";
        }
        catch
        {
            return "Fail";
        }
    }


    // --------------------- Delete ---------------------
    public async Task<string> DeleteAsync(int id)
    {
        try
        {
            var item = await _repositoryManager.OrderItemRepository.GetByIdAsync(id);
            if (item == null) return "Fail";

            int orderId = item.OrderId;

            await _repositoryManager.OrderItemRepository.DeleteAsync(item);

            // Recalculate parent order total
            await RecalculateOrderTotalAsync(orderId);

            return "Success";
        }
        catch
        {
            return "Fail";
        }
    }

    #endregion
}