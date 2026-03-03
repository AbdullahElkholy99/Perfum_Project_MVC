using Perfum.MVC.Models;
using System.Diagnostics;

namespace Perfum.MVC.Controllers;

public class HomeController : Controller
{
    private readonly IServiceManager _serviceManager;

    public HomeController(IServiceManager serviceManager)
    {
        _serviceManager = serviceManager;
    }

    public async Task<IActionResult> Index()
    {
        try
        {

            return View();

        }
        catch (Exception)
        {

            throw;
        }
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
