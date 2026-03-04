namespace Perfum.MVC.Controllers.DashBoards;

public class CustomerDashBoardController : Controller
{
    private readonly IServiceManager _serviceManager;

    public CustomerDashBoardController(IServiceManager serviceManager)
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
