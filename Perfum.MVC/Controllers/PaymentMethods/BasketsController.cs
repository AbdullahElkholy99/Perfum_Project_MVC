namespace Perfum.MVC.Controllers.PaymentMethods;

//public class BasketsController : BaseController
//{
//    public BasketsController(IServiceManager serviceManager, IMapper mapper) : base(serviceManager, mapper)
//    {
//    }

//    [HttpGet("get-basket-item/{id}")]
//    public async Task<IActionResult> get(string id)
//    {
//        var result = await _serviceManager.CustomerBasket.GetBasketAsync(id);
//        if (result is null)
//        {
//            return Ok(new CustomerBasketVM());
//        }
//        return Ok(result);
//    }
//    [HttpPost("update-basket")]
//    public async Task<IActionResult> add(CustomerBasketVM basket)
//    {
//        var _basket = await _serviceManager.CustomerBasket.UpdateBasketAsync(basket);
//        return Ok(basket);
//    }
//    [HttpDelete("delete-basket-item/{id}")]
//    public async Task<IActionResult> delete(string id)
//    {
//        var result = await _serviceManager.CustomerBasket.DeleteBasketAsync(id);

//        return result ?
//            Ok(new ResponseAPI(200, "item deleted!")) :
//            BadRequest(new ResponseAPI(400));
//    }
//}
