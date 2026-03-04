
using Perfum.Domain.Models.Orders;

namespace Perfum.MVC.MapperProfile.Orders;


public class OrderProfile : Profile
{
    public OrderProfile()
    {
        CreateMap<Order, OrderVM>();
        //.ForMember(des => des.Name, src => src.MapFrom(m => m.Name));

        CreateMap<AddOrderVM, Order>();

        CreateMap<EditOrderVM, Order>();
    }

}
