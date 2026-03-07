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

}
