namespace Perfum.MVC.Controllers.DashBoards;

public class DashboardController : Controller
{
    private readonly IServiceManager _serviceManager;

    public DashboardController(IServiceManager serviceManager)
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
}
