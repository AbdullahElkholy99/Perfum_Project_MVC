
namespace Perfum.MVC.MapperProfile;

public class CategoryProfile : Profile
{
    public CategoryProfile()
    {
        //Category source = > CategoryVM des
        CreateMap<Category, CategoryVM>();
        //.ForMember(des => des.Name, src => src.MapFrom(m => m.Name));

        CreateMap<AddCategoryVM, Category>();

        CreateMap<EditCategoryVM, Category>();
    }
}
