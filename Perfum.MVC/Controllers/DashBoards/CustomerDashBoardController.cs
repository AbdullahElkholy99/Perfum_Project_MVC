
namespace Perfum.MVC.Controllers.DashBoards;

public class CustomerDashBoardController : Controller
{
    private readonly IServiceManager _serviceManager;

    public CustomerDashBoardController(IServiceManager serviceManager)
    {
        _serviceManager = serviceManager;
    }

    // GET: /CustomerDashBoard
    public async Task<IActionResult> Index(CustomersFilter? filter)
    {
        var result = await _serviceManager.CustomerService.GetAllAsync(filter);

        if (result == null)
            result = new PagedResult<CustomerVM, CustomersFilter, DashBoardCustomer>
            {
                Items = new List<CustomerVM>(),
                TotalCount = 0,
                Filter = filter,
                DashboardVM = null
            };

        return View(result);
    }

    // GET: /CustomerDashBoard/Details/5
    public async Task<IActionResult> Details(int id)
    {
        if (id <= 0) return BadRequest();

        var customer = await _serviceManager.CustomerService.GetByIdAsync(id);
        if (customer == null || customer.Id == 0)
            return NotFound();

        return View(customer);
    }

    // GET: /CustomerDashBoard/Create
    [HttpGet]
    public IActionResult Create()
    {
        return View(new AddCustomerVM());
    }

    // POST: /CustomerDashBoard/Create
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(AddCustomerVM vm)
    {
        if (!ModelState.IsValid)
            return View(vm);

        var result = await _serviceManager.CustomerService.AddAsync(vm);

        if (result == "Success")
        {
            TempData["Success"] = "Customer created successfully.";
            return RedirectToAction(nameof(Index));
        }

        ModelState.AddModelError("", result); // shows the actual error
        return View(vm);
    }

    // GET: /CustomerDashBoard/Edit/5
    [HttpGet]
    public async Task<IActionResult> Edit(int id)
    {
        if (id <= 0) return BadRequest();

        var customer = await _serviceManager.CustomerService.GetByIdAsync(id);
        if (customer == null || customer.Id == 0)
            return NotFound();

        var vm = new EditCustomerVM
        {
            UserName = customer.UserName,
            Email = customer.Email,
            Address = customer.Address,
            PhoneNumber = customer.PhoneNumber
        };

        ViewBag.CustomerId = id;
        return View(vm);
    }

    // POST: /CustomerDashBoard/Edit/5
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(int id, EditCustomerVM vm)
    {
        if (id <= 0) return BadRequest();

        if (!ModelState.IsValid)
        {
            ViewBag.CustomerId = id;
            return View(vm);
        }

        var result = await _serviceManager.CustomerService.UpdateAsync(id, vm);

        if (result == "Success")
        {
            TempData["Success"] = "Customer updated successfully.";
            return RedirectToAction(nameof(Index));
        }

        ViewBag.CustomerId = id;
        ModelState.AddModelError("", result);
        return View(vm);
    }

    // GET: /CustomerDashBoard/Delete/5
    [HttpGet]
    public async Task<IActionResult> Delete(int id)
    {
        if (id <= 0) return BadRequest();

        var customer = await _serviceManager.CustomerService.GetByIdAsync(id);
        if (customer == null || customer.Id == 0)
            return NotFound();

        return View(customer);
    }

    // POST: /CustomerDashBoard/Delete/5
    [HttpPost, ActionName("Delete")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> DeleteConfirmed(int id)
    {
        if (id <= 0) return BadRequest();

        var result = await _serviceManager.CustomerService.DeleteAsync(id);

        if (result == "Success")
        {
            TempData["Success"] = "Customer deleted successfully.";
            return RedirectToAction(nameof(Index));
        }

        TempData["Error"] = "Could not delete customer.";
        return RedirectToAction(nameof(Delete), new { id });
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}