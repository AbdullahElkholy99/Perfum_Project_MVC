using Microsoft.AspNetCore.Authorization;
using Perfum.Repositories.IRepository.MangerRepository;

namespace Perfum.MVC.Controllers.PaymentMethods;

[Authorize(Roles = "Customer,Admin")]
public class PaymentsController : Controller
{
    private readonly IServiceManager _serviceManager;
    private readonly IRepositoryManager _repositoryManager;
    private readonly IMapper _mapper;

    public PaymentsController(IServiceManager serviceManager, IMapper mapper, IRepositoryManager repositoryManager)
    {
        _serviceManager = serviceManager;
        _mapper = mapper;
        _repositoryManager = repositoryManager;
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


}
