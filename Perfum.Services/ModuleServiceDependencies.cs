
using Perfum.MVC;
using Perfum.MVC.Services;

namespace Perfum.Services;

public static class ModuleServiceDependencies
{
    public static IServiceCollection AddServiceDependencies(
        this IServiceCollection services, IConfiguration configuration)
    {
        // register services here

        services.AddScoped<IServiceManager, ServiceManager>();

        services.AddScoped<ICategoryService, CategoryService>();
        services.AddScoped<IProductService, ProductService>();
        services.AddScoped<IFileService, FileService>();

        return services;
    }

}

