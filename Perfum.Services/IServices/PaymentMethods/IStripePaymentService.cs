using Stripe;

namespace Perfum.Services.IServices.PaymentMethods;

public interface IStripePaymentService
{
    //Task<CustomerBasketVM> CreateOrUpdatePaymentAsync(string basketId, int? deliveryId);
    //Task<Order> CreateOrUpdatePaymentOrderAsync(int orderId);
    Task<PaymentIntent> CreatePaymentIntentAsync(CreateOrderPaymentVM orderDTO);


    //Task<Order> UpdateOrderSuccess(string PaymentInten);
    //Task<Order> UpdateOrderFaild(string PaymentInten);

}
