
namespace Perfum.MVC.MapperProfile;

public class CategoryProfile : Profile
{
    public CategoryProfile()
    {
        CreateMap<Category, CategoryVM>();

        CreateMap<AddCategoryVM, Category>();

        CreateMap<EditCategoryVM, Category>();
    }
}
