
using Perfum.MVC;
using Perfum.MVC.Services;
using Perfum.Services.Services.Authentication;

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

        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IRoleService, RoleService>();


        return services;
    }

}

