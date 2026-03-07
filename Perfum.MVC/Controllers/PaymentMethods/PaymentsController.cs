using Perfum.Domain.Models.Orders;
using Perfum.Repositories.IRepository.MangerRepository;

namespace Perfum.MVC.Controllers.PaymentMethods;

public class PaymentsController : Controller
{

    const string endpointSecret = "whsec_28cc3dec50be3eaba23c0d5217e31f075148d84948bb1e7aa84452952a3a9461";
    private readonly IServiceManager _serviceManager;
    private readonly IRepositoryManager _repositoryManager;
    private readonly IMapper _mapper;

    public PaymentsController(IServiceManager serviceManager, IMapper mapper, IRepositoryManager repositoryManager)
    {
        _serviceManager = serviceManager;
        _mapper = mapper;
        _repositoryManager = repositoryManager;
    }

    //[Authorize]
    [HttpPost]
    public async Task<IActionResult> create(string basketId, int? deliveryId)
    {
        var result = await _serviceManager
            .StripePaymentService
            .CreateOrUpdatePaymentAsync(basketId, deliveryId);

        if (result is not null)
            return Json(() => new { Result = true });

        return Json(() => new { Result = false });
    }
    [HttpPost]
    public async Task<IActionResult> CreatePayment([FromBody] int orderId)
    {
        var order = await _serviceManager
            .StripePaymentService
            .CreateOrUpdatePaymentOrderAsync(orderId);

        return Json(new
        {
            clientSecret = order.ClientSecret
        });
    }
    [HttpPost]
    public async Task<IActionResult> CreatePaymentIntent([FromBody] CreateOrderPaymentVM model)
    {
        var paymentIntent = await _serviceManager
            .StripePaymentService
            .CreatePaymentIntentAsync(model);

        return Json(new
        {
            clientSecret = paymentIntent.ClientSecret
        });
    }

    public async Task<IActionResult> UpdateBasket([FromBody] CustomerBasket basket)
    {
        var result = await _repositoryManager
            .CustomerBasketRepositry
            .UpdateBasketAsync(basket);


        return Json(result);
    }
}