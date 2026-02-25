using AutoMapper;
using Perfum.Domain.Models;
using Perfum.Services.ViewModels.CategoryVM;

namespace Perfum.MVC.MapperProfile;

public class CategoryProfile : Profile
{
    public CategoryProfile()
    {
        CreateMap<Category, CategoryVM>();

    }
}
