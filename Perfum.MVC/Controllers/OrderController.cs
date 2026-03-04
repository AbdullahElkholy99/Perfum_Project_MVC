
namespace Perfum.MVC.Controllers;


public class OrderController : Controller
{
    #region Fields

    private readonly IServiceManager _serviceManager;

    #endregion


    #region CTORs

    public OrderController(IServiceManager serviceManager)
    {
        _serviceManager = serviceManager;
    }

    #endregion


    #region Index

    // GET: /Order
    public async Task<IActionResult> Index()
    {
        var result = await _serviceManager.OrderService.GetAllAsync();

        if (result == null)
        {
            TempData["Error"] = "Failed to load orders.";
            return View(new PagedResult<OrderVM, OrderFilter, DashBoardOrder>
            {
                Items = new List<OrderVM>(),
                TotalCount = 0,
                Filter = null,
                DashboardVM = null
            });
        }

        return View("Index", result);
    }

    #endregion


    #region Details

    // GET: /Order/Details/5
    public async Task<IActionResult> Details(int id)
    {
        if (id <= 0)
            return BadRequest();

        var order = await _serviceManager.OrderService.GetByIdAsync(id);

        if (order == null || order.Id == 0)
        {
            TempData["Error"] = "Order not found.";
            return RedirectToAction(nameof(Index));
        }

        // Load order items for this order
        var orderItems = await _serviceManager.OrderItemService.GetAllByOrderIdAsync(id);
        ViewBag.OrderItems = orderItems ?? new List<OrderItemVM>();

        return View("Details", order);
    }

    #endregion


    #region Create

    // GET: /Order/Create
    public IActionResult Create()
    {
        return View(new AddOrderVM());
    }

    // POST: /Order/Create
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(AddOrderVM model)
    {
        if (!ModelState.IsValid)
            return View(model);

        var result = await _serviceManager.OrderService.AddAsync(model);

        if (result != "Success")
        {
            TempData["Error"] = "Failed to create order. Please try again.";
            return View(model);
        }

        TempData["Success"] = "Order created successfully.";
        return RedirectToAction(nameof(Index));
    }

    #endregion


    #region Edit

    // GET: /Order/Edit/5
    public async Task<IActionResult> Edit(int id)
    {
        if (id <= 0)
            return BadRequest();

        var order = await _serviceManager.OrderService.GetByIdAsync(id);

        if (order == null || order.Id == 0)
        {
            TempData["Error"] = "Order not found.";
            return RedirectToAction(nameof(Index));
        }

        var editModel = new EditOrderVM
        {
            ShippingAddress = order.ShippingAddress,
            Date = order.Date,
            Status = order.Status,
            TotalPrice = order.TotalPrice,
            OrderItems = order.OrderItems
        };

        ViewBag.OrderId = id;
        return View(editModel);
    }

    // POST: /Order/Edit/5
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(int id, EditOrderVM model)
    {
        if (id <= 0)
            return BadRequest();

        if (!ModelState.IsValid)
        {
            ViewBag.OrderId = id;
            return View(model);
        }

        var result = await _serviceManager.OrderService.UpdateAsync(id, model);

        if (result != "Success")
        {
            TempData["Error"] = "Failed to update order. Please try again.";
            ViewBag.OrderId = id;
            return View(model);
        }

        TempData["Success"] = "Order updated successfully.";
        return RedirectToAction(nameof(Index));
    }

    #endregion


    #region Delete

    // GET: /Order/Delete/5
    public async Task<IActionResult> Delete(int id)
    {
        if (id <= 0)
            return BadRequest();

        var order = await _serviceManager.OrderService.GetByIdAsync(id);

        if (order == null || order.Id == 0)
        {
            TempData["Error"] = "Order not found.";
            return RedirectToAction(nameof(Index));
        }

        return View(order);
    }

    // POST: /Order/Delete/5
    [HttpPost, ActionName("Delete")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> DeleteConfirmed(int id)
    {
        if (id <= 0)
            return BadRequest();

        var result = await _serviceManager.OrderService.DeleteAsync(id);

        if (result != "Success")
        {
            TempData["Error"] = "Failed to delete order. Please try again.";
            return RedirectToAction(nameof(Delete), new { id });
        }

        TempData["Success"] = "Order deleted successfully.";
        return RedirectToAction(nameof(Index));
    }

    #endregion


    #region Order Items (nested actions)

    // GET: /Order/OrderItems/5  — list items for an order
    public async Task<IActionResult> OrderItems(int id)
    {
        if (id <= 0)
            return BadRequest();

        var order = await _serviceManager.OrderService.GetByIdAsync(id);

        if (order == null || order.Id == 0)
        {
            TempData["Error"] = "Order not found.";
            return RedirectToAction(nameof(Index));
        }

        var items = await _serviceManager.OrderItemService.GetAllByOrderIdAsync(id);

        ViewBag.Order = order;
        ViewBag.OrderId = id;

        return View(items ?? new List<OrderItemVM>());
    }

    // GET: /Order/AddItem/5
    public IActionResult AddItem(int orderId)
    {
        if (orderId <= 0)
            return BadRequest();

        return View(new AddOrderItemVM { OrderId = orderId });
    }

    // POST: /Order/AddItem
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> AddItem(AddOrderItemVM model)
    {
        if (!ModelState.IsValid)
            return View(model);

        var result = await _serviceManager.OrderItemService.AddAsync(model);

        if (result != "Success")
        {
            TempData["Error"] = "Failed to add item. Please try again.";
            return View(model);
        }

        TempData["Success"] = "Item added successfully.";
        return RedirectToAction(nameof(OrderItems), new { id = model.OrderId });
    }

    // GET: /Order/EditItem/5
    public async Task<IActionResult> EditItem(int id)
    {
        if (id <= 0)
            return BadRequest();

        var item = await _serviceManager.OrderItemService.GetByIdAsync(id);

        if (item == null || item.Id == 0)
        {
            TempData["Error"] = "Order item not found.";
            return RedirectToAction(nameof(Index));
        }

        var editModel = new EditOrderItemVM
        {
            Quantity = item.Quantity,
            UnitPrice = item.UnitPrice,
            OrderId = item.OrderId,
            ProductId = item.ProductId
        };

        ViewBag.ItemId = id;
        return View(editModel);
    }

    // POST: /Order/EditItem/5
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> EditItem(int id, EditOrderItemVM model)
    {
        if (id <= 0)
            return BadRequest();

        if (!ModelState.IsValid)
        {
            ViewBag.ItemId = id;
            return View(model);
        }

        var result = await _serviceManager.OrderItemService.UpdateAsync(id, model);

        if (result != "Success")
        {
            TempData["Error"] = "Failed to update item. Please try again.";
            ViewBag.ItemId = id;
            return View(model);
        }

        TempData["Success"] = "Item updated successfully.";
        return RedirectToAction(nameof(OrderItems), new { id = model.OrderId });
    }

    // GET: /Order/DeleteItem/5
    public async Task<IActionResult> DeleteItem(int id)
    {
        if (id <= 0)
            return BadRequest();

        var item = await _serviceManager.OrderItemService.GetByIdAsync(id);

        if (item == null || item.Id == 0)
        {
            TempData["Error"] = "Order item not found.";
            return RedirectToAction(nameof(Index));
        }

        return View(item);
    }

    // POST: /Order/DeleteItem/5
    [HttpPost, ActionName("DeleteItem")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> DeleteItemConfirmed(int id, int orderId)
    {
        if (id <= 0)
            return BadRequest();

        var result = await _serviceManager.OrderItemService.DeleteAsync(id);

        if (result != "Success")
        {
            TempData["Error"] = "Failed to delete item. Please try again.";
            return RedirectToAction(nameof(DeleteItem), new { id });
        }

        TempData["Success"] = "Item deleted successfully.";
        return RedirectToAction(nameof(OrderItems), new { id = orderId });
    }

    #endregion
}
