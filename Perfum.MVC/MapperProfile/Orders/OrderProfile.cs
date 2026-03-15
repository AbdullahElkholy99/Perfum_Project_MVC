
namespace Perfum.MVC.MapperProfile.Orders;


public class OrderProfile : Profile
{
    public OrderProfile()
    {
        CreateMap<Order, OrderVM>().ReverseMap();
        //.ForMember(des => des.Name, src => src.MapFrom(m => m.Name));

        CreateMap<AddOrderVM, Order>();

        CreateMap<EditOrderVM, Order>();
    }

}
