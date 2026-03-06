namespace Perfum.MVC.Controllers;

public class HomeController : Controller
{
    private readonly IServiceManager _serviceManager;

    public HomeController(IServiceManager serviceManager)
    {
        _serviceManager = serviceManager;
    }

    public async Task<IActionResult> Index(PagedResult<ProductVM, ProductFilter, DashBoardProduct>? pagedResult)
    {
        PagedResult<ProductVM, ProductFilter, DashBoardProduct>? result = await _serviceManager.ProductService.GetAllAsync(null);

        if (result == null)
            result = new PagedResult<ProductVM, ProductFilter, DashBoardProduct>
            {
                Items = new List<ProductVM>(),
                TotalCount = 0,
                Filter = null,
                DashboardVM = null
            };

        return View(result);
    }

}
