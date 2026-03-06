using Stripe;

namespace Perfum.MVC.Controllers.PaymentMethods;

[Route("api/[controller]")]
[ApiController]

public class PaymentsController : BaseController
{

    const string endpointSecret = "whsec_28cc3dec50be3eaba23c0d5217e31f075148d84948bb1e7aa84452952a3a9461";

    public PaymentsController(IServiceManager serviceManager, IMapper mapper) : base(serviceManager, mapper)
    { }

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
    public async Task<IActionResult> CreatePayment(int orderId)
    {
        var order = await _serviceManager
            .StripePaymentService
            .CreateOrUpdatePaymentOrderAsync(orderId);

        return Json(new
        {
            clientSecret = order.ClientSecret
        });
    }
    //[HttpPost("webhook")]   
    [HttpPost]
    public async Task<IActionResult> UpdateStatusWithStripe()
    {
        var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
        try
        {
            //var stripeEvent = EventUtility.ConstructEvent(json,
            //    Request.Headers["Stripe-Signature"], endpointSecret, throwOnApiVersionMismatch: false);
            //PaymentIntent intent;
            //Order orders;
            //// Handle the event
            //if (stripeEvent.Type == Events.PaymentIntentPaymentFailed)
            //{
            //    intent = stripeEvent.Data.Object as PaymentIntent;
            //    orders = await _serviceManager.StripePaymentService.UpdateOrderFaild(intent.Id);
            //}
            //else if (stripeEvent.Type == Events.PaymentIntentSucceeded)
            //{
            //    intent = stripeEvent.Data.Object as PaymentIntent;
            //    orders = await _serviceManager.StripePaymentService.UpdateOrderSuccess(intent.Id);
            //}
            //// ... handle other event types
            //else
            //{
            //    Console.WriteLine("Unhandled event type: {0}", stripeEvent.Type);
            //}

            return Ok();
        }
        catch (StripeException e)
        {
            return BadRequest();
        }
    }
}