

namespace Perfum.MVC.MapperProfile
{
    public class ProductProfile : Profile
    {
        public ProductProfile()
        {
            CreateMap<Product, ProductVM>();
            //.ForMember(des => des.Name, src => src.MapFrom(m => m.Name));

            CreateMap<AddProductVM, Product>();

            CreateMap<EditProductVM, Product>()
                .ForMember(d => d.ImageUrl, o => o.Ignore());
        }
        
    }
}
