
using Perfum.MVC;
using Perfum.MVC.Services;
using Perfum.Services.IServices.Orders;
using Perfum.Services.Services.Authentication;
using Perfum.Services.Services.OrderItems;
using Perfum.Services.Services.Orders;

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


        services.AddScoped<IOrderService, OrderService>();
        services.AddScoped<IOrderItemService, OrderItemService>();

        return services;
    }

}

