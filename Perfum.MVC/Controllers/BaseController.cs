namespace Perfum.MVC.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BaseController : Controller
{
    protected readonly IServiceManager _serviceManager;
    protected readonly IMapper _mapper;
    public BaseController(IServiceManager work, IMapper mapper)
    {
        _serviceManager = work;
        mapper = mapper;
    }
}