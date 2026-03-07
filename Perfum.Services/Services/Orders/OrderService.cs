
using Perfum.Domain.Models.Orders;
using Perfum.Repositories.Data;
using Perfum.Services.IServices.PaymentMethods;
using Perfum.Services.ViewModels.OrderVM;

namespace Perfum.Services.Services.Orders;

public class OrderService : IOrderService
{
    #region Fields

    private readonly IRepositoryManager _repositoryManager;
    private readonly IFileService _fileService;
    private readonly IMapper _mapper;

    //by abdullah ali
    private readonly AppDbContext _context;
    private readonly IStripePaymentService _paymentService;

    #endregion


    #region CTORs
    public OrderService(IRepositoryManager repositoryManager, IMapper mapper, IFileService fileService, AppDbContext context, IStripePaymentService paymentService)
    {
        _repositoryManager = repositoryManager;
        _mapper = mapper;
        _fileService = fileService;
        _context = context;
        _paymentService = paymentService;
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

    // by abdullah ali
    public async Task<Order> CreateOrdersAsync(CreateOrderPaymentVM orderDTO, string BuyerEmail)
    {
        var basket = await _repositoryManager.CustomerBasketRepositry.GetBasketAsync(orderDTO.BasketId);

        List<OrderItem> orderItems = new List<OrderItem>();

        foreach (var item in basket.basketItems)
        {
            var Product = await _repositoryManager.ProductRepository.GetByIdAsync(item.Id);
            var orderItem = new OrderItem
            {
                Id = Product.Id,
                ProductName = Product.Name,
                UnitPrice = (decimal)item.Price,
                Quantity = item.Qunatity
            };

            orderItems.Add(orderItem);

        }
        var deliverMethod = await _context.DeliveryMethods.FirstOrDefaultAsync(m => m.Id == orderDTO.DeliveryMethodId);

        var subTotal = orderItems.Sum(m => m.UnitPrice * m.Quantity);

        var ship = _mapper.Map<ShippingAddress>(orderDTO.ShipAddress);

        var ExisitOrder =
            await _context.Orders
            .Where(m => m.PaymentIntentId == basket.PaymentIntentId)
            .FirstOrDefaultAsync();

        if (ExisitOrder is not null)
        {
            _context.Orders.Remove(ExisitOrder);
            await _paymentService
                .CreateOrUpdatePaymentAsync(
                basket.PaymentIntentId,
                deliverMethod.Id
                );
        }

        var order = new
            Order(BuyerEmail, subTotal, ship, deliverMethod, orderItems, basket.PaymentIntentId);

        await _context.Orders.AddAsync(order);
        await _context.SaveChangesAsync();

        await _repositoryManager.CustomerBasketRepositry.DeleteBasketAsync(orderDTO.BasketId);
        return order;

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