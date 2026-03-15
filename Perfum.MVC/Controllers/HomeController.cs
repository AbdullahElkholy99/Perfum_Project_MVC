using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages;

namespace Perfum.MVC.Controllers;

public class HomeController : Controller
{
    private readonly IServiceManager _serviceManager;
    private readonly IMapper _mapper;

    public HomeController(IServiceManager serviceManager, IMapper mapper)
    {
        _serviceManager = serviceManager;
        _mapper = mapper;
    }

    public async Task<IActionResult> Index(PagedResult<ProductVM, ProductFilter, DashBoardProduct>? pagedResult)
    {
        var filter = new ProductFilter();

        var result = await _serviceManager.ProductService.GetAllAsync(filter);

        if (result == null)
            result = new PagedResult<ProductVM, ProductFilter, DashBoardProduct>
            {
                Items = new List<ProductVM>(),
                TotalCount = 0,
                Filter = filter,
                DashboardVM = null
            };
        else if (result.Filter == null)
            result.Filter = filter;

        return View(result);
    }
    [HttpGet]
    public async Task<IActionResult> Profile()
    {
        var idStr = Request.Cookies["Id"];
        if (string.IsNullOrEmpty(idStr) || !int.TryParse(idStr, out var userId))
            return RedirectToAction(nameof(Login));

        var user = await _serviceManager.UserService.FindByIdAsync(userId);
        if (user == null)
            return RedirectToAction(nameof(Login));

        ViewBag.UserName = user.UserName ?? user.Email;
        ViewBag.Email = user.Email;
        ViewBag.ImagePath = user.ImagePath;
        return View();
    }

    #region Read
    [HttpGet]
    public async Task<IActionResult> GetCustomer(int id)
    {
        var customer = await _serviceManager.CustomerService.GetByIdAsync(id);

        if (customer == null)
            return NotFound();

        return Json(new
        {
            userName = customer.UserName,
            email = customer.Email,
            address = customer.Address,
            phoneNumber = customer.PhoneNumber
        });
    }

    // GET: /Order/Details/5

    public async Task<IActionResult> GetOrderByCustomerId()
    {

        int id = Convert.ToInt32(Request.Cookies["Id"]);

        if (id <= 0)
            return BadRequest();

        OrderVM? order = await _serviceManager.OrderService.GetByCustomerIdAsync(id);

        if (order == null || order.Id == 0)
        {
            TempData["Error"] = "Order not found.";
            return BadRequest();
        }

        var orderItems =
            await _serviceManager.OrderItemService
            .GetAllOrderItemsByOrderIdAsync(order.Id);

        if (orderItems != null)
            order.OrderItemsWithProduct = orderItems;

        return Json(order);
    }


    #endregion


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
            return RedirectToAction(nameof(Profile));
        }

        ViewBag.CustomerId = id;
        ModelState.AddModelError("", result);
        return View(vm);
    }
    [HttpPost]
    public async Task<IActionResult> UpdateProfileImage(int id, IFormFile ProfileImage)
    {
        if (ProfileImage == null)
            return BadRequest();

        var imagePath = await _serviceManager.UserService.EditImageAsync(id, ProfileImage);

        var idStr = Request.Cookies["Id"];
        if (!string.IsNullOrEmpty(idStr) && idStr == id.ToString())
        {
            var options = new CookieOptions
            {
                HttpOnly = true,
                IsEssential = true,
                Secure = false,
                SameSite = SameSiteMode.Lax,
                Expires = DateTimeOffset.UtcNow.AddDays(7)
            };
            Response.Cookies.Append("ImagePath", imagePath ?? "", options);
        }

        return Json(new { imagePath });
    }


    #region return partial views : 

    public IActionResult OrdersTab()
    {
        return PartialView("~/Views/Home/CustomerProfile/_OrderSection.cshtml", null);
    }
    public IActionResult ProfileTab()
    {
        return PartialView("~/Views/Home/CustomerProfile/_EditProfile.cshtml", null);
    }
    public IActionResult NotificationsTab()
    {
        return PartialView("~/Views/Home/CustomerProfile/_Notifications.cshtml", null);
    }
    #endregion

}
