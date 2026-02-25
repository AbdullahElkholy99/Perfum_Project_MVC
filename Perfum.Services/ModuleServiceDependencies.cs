
namespace Perfum.Services;

public static class ModuleServiceDependencies
{
    public static IServiceCollection AddServiceDependencies(
        this IServiceCollection services, IConfiguration configuration)
    {
        // register services here

        services.AddScoped<IServiceManager, ServiceManager>();

        services.AddScoped<ICategoryService, CategoryService>();

        return services;
    }

}

