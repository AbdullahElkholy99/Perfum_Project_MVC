
namespace Perfum.MVC.MapperProfile.Orders;

public class OrderItemProfile : Profile
{
    public OrderItemProfile()
    {
        CreateMap<OrderItem, OrderItemVM>();
        //.ForMember(des => des.Name, src => src.MapFrom(m => m.Name));

        CreateMap<AddOrderItemVM, OrderItem>();

        CreateMap<EditOrderItemVM, OrderItem>();
    }

}
