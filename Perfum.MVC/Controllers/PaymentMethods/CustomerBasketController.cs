//using Perfum.Repositories.IRepository.MangerRepository;

//namespace Perfum.MVC.Controllers.PaymentMethods;

//public class CustomerBasketController : Controller
//{
//    private readonly IServiceManager _serviceManager;
//    private readonly IRepositoryManager _repositoryManager;
//    private readonly IMapper _mapper;
//    public CustomerBasketController(IServiceManager serviceManager, IMapper mapper, IRepositoryManager repositoryManager)
//    {
//        _serviceManager = serviceManager;
//        _mapper = mapper;
//        _repositoryManager = repositoryManager;
//    }

//    public async Task<IActionResult> UpdateBasket([FromBody] CustomerBasket basket)
//    {
//        var result =
//            await _repositoryManager
//                .CustomerBasketRepositry
//                .UpdateBasketAsync(basket);


//        return Json(result);
//    }
//    [HttpPost]
//    public async Task<IActionResult> Clear()
//    {
//        //await _repositoryManager
//        //        .CustomerBasketRepositry.ClearBasketAsync(User.Identity.Name);
//        return Ok();
//    }

//}
