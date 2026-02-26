using Microsoft.AspNetCore.Mvc;
using Perfum.MVC.Models;
using Perfum.Services.IServices.ManagerService;
using System.Diagnostics;

namespace Perfum.MVC.Controllers;

public class HomeController : Controller
{
    private readonly IServiceManager _serviceManager;

    public HomeController(IServiceManager serviceManager)
    {
        _serviceManager = serviceManager;
    }

    public IActionResult Index()
    {
        return View();
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
