namespace Perfum.Services.Services.ManagerService;

public class ServiceManager : IServiceManager
{
    public ICategoryService CategoryService { get; }

    public ServiceManager(ICategoryService categoryService)
    {
        CategoryService = categoryService;
    }
}
