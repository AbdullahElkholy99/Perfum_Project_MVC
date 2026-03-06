
using Perfum.Domain.Models.Orders;
using Perfum.Services.ViewModels.OrderVM;

namespace Perfum.Services.Services.Orders;

public class OrderService : IOrderService
{
    #region Fields

    private readonly IRepositoryManager _repositoryManager;
    private readonly IFileService _fileService;
    private readonly IMapper _mapper;

    #endregion


    #region CTORs
    public OrderService(IRepositoryManager repositoryManager, IMapper mapper, IFileService fileService)
    {
        _repositoryManager = repositoryManager;
        _mapper = mapper;
        _fileService = fileService;
    }
    #endregion


    #region Helpers

    /// <summary>
    /// Recalculates TotalPrice from the order's items and saves.
    /// Call this after any add/edit/delete of an OrderItem.
    /// </summary>
    private async Task RecalculateTotalAsync(int orderId)
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
    public async Task<string> AddAsync(AddOrderVM model)
    {
        using var transaction = _repositoryManager.OrderRepository.BeginTransaction();
        try
        {
            if (model == null) return "Fail";

            var order = _mapper.Map<Order>(model);
            if (order == null) return "Fail";

            // Always start at 0 — items will drive the total
            order.TotalPrice = 0;

            await _repositoryManager.OrderRepository.AddAsync(order);

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
    public async Task<PagedResult<OrderVM, OrderFilter, DashBoardOrder>> GetAllAsync()
    {
        try
        {
            var orders = await _repositoryManager.OrderRepository
                               .GetTableNoTracking()
                               .ToListAsync();

            if (orders == null) return null;

            var orderVMs = _mapper.Map<List<OrderVM>>(orders);
            if (orderVMs == null) return null;

            return new PagedResult<OrderVM, OrderFilter, DashBoardOrder>
            {
                Items = orderVMs,
                DashboardVM = null,
                TotalCount = orderVMs.Count,
                Filter = null
            };
        }
        catch
        {
            return null;
        }
    }


    public async Task<OrderVM> GetByIdAsync(int id)
    {
        try
        {
            var order = await _repositoryManager.OrderRepository.GetByIdAsync(id);
            if (order == null) return new OrderVM();

            var orderVM = _mapper.Map<OrderVM>(order);
            return orderVM ?? new OrderVM();
        }
        catch
        {
            return new OrderVM();
        }
    }


    // --------------------- Update ---------------------
    public async Task<string> UpdateAsync(int id, EditOrderVM model)
    {
        try
        {
            var oldOrder = await _repositoryManager.OrderRepository.GetByIdAsync(id);
            if (oldOrder == null) return "Fail";

            _mapper.Map(model, oldOrder);

            // Recalculate from items — ignore whatever value came from the form
            var items = await _repositoryManager.OrderItemRepository
                              .GetAllByOrderId(id)
                              .ToListAsync();

            oldOrder.TotalPrice = items.Sum(i => i.UnitPrice * i.Quantity);

            await _repositoryManager.OrderRepository.SaveChangesAsync();
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
            var order = await _repositoryManager.OrderRepository.GetByIdAsync(id);
            if (order == null) return "Fail";

            await _repositoryManager.OrderRepository.DeleteAsync(order);
            return "Success";
        }
        catch
        {
            return "Fail";
        }
    }

    #endregion
}