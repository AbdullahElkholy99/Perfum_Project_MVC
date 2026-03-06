namespace Perfum.Repositories.IRepository.PaymentMethods;

public interface ICustomerBasketRepositry
{
    Task<CustomerBasket> GetBasketAsync(string id);
    Task<CustomerBasket> UpdateBasketAsync(CustomerBasket basket);
    Task<bool> DeleteBasketAsync(string id);
}