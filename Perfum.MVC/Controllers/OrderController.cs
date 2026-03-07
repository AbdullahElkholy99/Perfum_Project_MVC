
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


    #region Helpers

    private async Task LoadCustomersDropdownAsync()
    {
        var customers = await _serviceManager.CustomerService.GetAllAsync(null);
        ViewBag.Customers = (customers?.Items ?? new List<CustomerVM>())
            .Select(c => new SelectListItem
            {
                Value = c.Id.ToString(),
                Text = $"{c.UserName} — {c.Email}"
            }).ToList();
    }

    private async Task LoadProductsDropdownAsync()
    {
        var products = await _serviceManager.ProductService.GetAllAsync(new ProductFilter());
        ViewBag.Products = (products?.Items ?? new List<ProductVM>())
            .Select(p => new SelectListItem
            {
                Value = p.Id.ToString(),
                Text = $"{p.Name} — ${p.Price:N2}"
            }).ToList();
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

        return View(result);
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

        var orderItems = await _serviceManager.OrderItemService.GetAllByOrderIdAsync(id);
        ViewBag.OrderItems = orderItems ?? new List<OrderItemVM>();

        return View(order);
    }

    #endregion


    #region Create

    // GET: /Order/Create
    public async Task<IActionResult> Create()
    {
        await LoadCustomersDropdownAsync();
        return View(new AddOrderVM());
    }

    // POST: /Order/Create
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(AddOrderVM model)
    {
        if (!ModelState.IsValid)
        {
            await LoadCustomersDropdownAsync();
            return View(model);
        }

        var result = await _serviceManager.OrderService.AddAsync(model);

        if (result != "Success")
        {
            TempData["Error"] = result; // show real error message
            await LoadCustomersDropdownAsync();
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

        await LoadCustomersDropdownAsync();

        var editModel = new EditOrderVM
        {
            ShippingAddress = order.ShippingAddress,
            Date = order.Date,
            Status = order.Status,
            TotalPrice = order.TotalPrice,
            CustomerId = order.CustomerId,
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
            await LoadCustomersDropdownAsync();
            ViewBag.OrderId = id;
            return View(model);
        }

        var result = await _serviceManager.OrderService.UpdateAsync(id, model);

        if (result != "Success")
        {
            TempData["Error"] = result;
            await LoadCustomersDropdownAsync();
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


    #region Order Items

    // GET: /Order/OrderItems/5
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

    // GET: /Order/AddItem?orderId=5
    public async Task<IActionResult> AddItem(int orderId)
    {
        if (orderId <= 0)
            return BadRequest();

        await LoadProductsDropdownAsync();
        return View(new AddOrderItemVM { OrderId = orderId });
    }

    // POST: /Order/AddItem
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> AddItem(AddOrderItemVM model)
    {
        if (!ModelState.IsValid)
        {
            await LoadProductsDropdownAsync();
            return View(model);
        }

        var result = await _serviceManager.OrderItemService.AddAsync(model);

        if (result != "Success")
        {
            TempData["Error"] = "Failed to add item. Please try again.";
            await LoadProductsDropdownAsync();
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