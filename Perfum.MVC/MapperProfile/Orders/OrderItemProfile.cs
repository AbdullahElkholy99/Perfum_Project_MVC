
namespace Perfum.MVC.MapperProfile.Orders;

public class OrderItemProfile : Profile
{
    public OrderItemProfile()
    {
        CreateMap<OrderItem, OrderItemVM>()
            .ForMember(dst => dst.ImageUrl, src => src.MapFrom(m => m.Product.ImageUrl))
            .ReverseMap();
        //.ForMember(des => des.Name, src => src.MapFrom(m => m.Name));

        CreateMap<AddOrderItemVM, OrderItem>();

        CreateMap<EditOrderItemVM, OrderItem>();
    }

}
