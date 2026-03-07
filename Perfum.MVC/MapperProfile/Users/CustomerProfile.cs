
namespace Perfum.MVC.MapperProfile.Users;

public class CustomerProfile : Profile
{
    public CustomerProfile()
    {
        CreateMap<RegisterVM, Customer>().ReverseMap();

        CreateMap<Customer, CustomerVM>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.UserName))
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
            .ForMember(dest => dest.Address, opt => opt.MapFrom(src => src.Address))
            .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.PhoneNumber))
            .ForMember(dest => dest.ImageUrl, opt => opt.MapFrom(src => src.ImagePath))
            .ForMember(dest => dest.Orders, opt => opt.MapFrom(src => src.Orders))
            .ForMember(dest => dest.Reviews, opt => opt.MapFrom(src => src.Reviews));
    }
}
