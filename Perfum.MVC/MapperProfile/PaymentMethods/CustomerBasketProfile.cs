using Perfum.Services.ViewModels.PaymentMethodsVM;

namespace Perfum.MVC.MapperProfile.PaymentMethods;


public class CustomerBasketProfile : Profile
{
    public CustomerBasketProfile()
    {
        //Category source = > CategoryVM des
        CreateMap<CustomerBasket, CustomerBasketVM>().ReverseMap();
        CreateMap<ShippingAddress, ShipAddressDTO>().ReverseMap();
    }
}
