using Microsoft.AspNetCore.Mvc;
using Perfum.MVC.Models;
using Perfum.Services.IServices.ManagerService;
using Perfum.Services.ViewModels.Paginations;
using System.Diagnostics;

namespace Perfum.MVC.Controllers;

public class ProductController : Controller
{
    private readonly IServiceManager _serviceManager;

    public ProductController(IServiceManager serviceManager)
    {
        _serviceManager = serviceManager;
    }

    public async Task<IActionResult> Index()
    {
        var result = await _serviceManager.ProductService.GetAllAsync();
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

    public IActionResult Privacy()
    {
        return View();
        //save image first -> path image
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
