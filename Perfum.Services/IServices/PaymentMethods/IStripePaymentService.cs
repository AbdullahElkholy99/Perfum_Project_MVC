using Perfum.Domain.Models.Orders;
using Perfum.Services.ViewModels.PaymentMethodsVM;

namespace Perfum.Services.IServices.PaymentMethods;

public interface IStripePaymentService
{
    Task<CustomerBasketVM> CreateOrUpdatePaymentAsync(string basketId, int? deliveryId);
    Task<Order> CreateOrUpdatePaymentOrderAsync(int orderId);


    Task<Order> UpdateOrderSuccess(string PaymentInten);
    Task<Order> UpdateOrderFaild(string PaymentInten);

}
