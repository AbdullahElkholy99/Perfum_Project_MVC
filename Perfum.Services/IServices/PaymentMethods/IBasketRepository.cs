using Perfum.Domain.Models.Orders;

namespace Perfum.Services.IServices.PaymentMethods;

public interface IBasketRepository
{
    Task<CustomerBasket> GetBasketAsync(string basketId);

    Task<CustomerBasket> UpdateBasketAsync(CustomerBasket basket);

    Task<bool> DeleteBasketAsync(string basketId);
}