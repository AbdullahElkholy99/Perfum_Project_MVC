using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Perfum.MVC.Models;
using Perfum.Services.ViewModels.OrderVM;
using Perfum.Services.ViewModels.Paginations;
using System.Diagnostics;

namespace Perfum.MVC.Controllers.Orders;

public class OrderController : Controller
{

    private readonly IServiceManager _serviceManager;

    public OrderController(IServiceManager serviceManager)
    {
        _serviceManager = serviceManager;
    }

    public async Task<IActionResult> Index()
    {
        var result = await _serviceManager.OrderService.GetAllAsync();
        if (result == null)
            result = new PagedResult<OrderVM, OrderFilter, DashBoardOrder>
            {
                Items = new List<OrderVM>(),
                TotalCount = 0,
                Filter = null,
                DashboardVM = null
            };
        return View(result);
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }


}
