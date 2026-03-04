namespace Perfum.MVC.Controllers.DashBoards;

public class CollectionController : Controller
{
    private readonly IServiceManager _serviceManager;

    public CollectionController(IServiceManager serviceManager)
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
