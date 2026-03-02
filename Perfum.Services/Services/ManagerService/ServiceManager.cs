namespace Perfum.Services.Services.ManagerService;

public class ServiceManager : IServiceManager
{
    public ICategoryService CategoryService { get; }
    public IProductService ProductService { get; }

    public ServiceManager(ICategoryService categoryService, IProductService productService)
    {
        CategoryService = categoryService;
        ProductService = productService;
    }
}
