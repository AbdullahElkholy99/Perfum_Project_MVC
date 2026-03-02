namespace Perfum.MVC.MapperProfile.Users
{
    public class CustomerProfile : Profile
    {
        public CustomerProfile()
        {
            CreateMap<RegisterVM, Customer>().ReverseMap();
        }
    }
}
