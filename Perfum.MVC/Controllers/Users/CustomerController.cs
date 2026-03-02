using Perfum.MVC.Models;
using Perfum.Services.ViewModels.Paginations;
using System.Diagnostics;

namespace Perfum.MVC.Controllers;

public class CustomerController : Controller
{
    private readonly IServiceManager _serviceManager;

    public CustomerController(IServiceManager serviceManager)
    {
        _serviceManager = serviceManager;
    }

    public async Task<IActionResult> Index(PagedResult<CategoryVM, CategoryFilter, DashBoardCategory>? filter)
    {
        try
        {

            PagedResult<CategoryVM, CategoryFilter, DashBoardCategory>? categories = await _serviceManager.CategoryService.GetAllAsync(filter?.Filter);

            return View(categories);

        }
        catch (Exception)
        {

            throw;
        }
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
