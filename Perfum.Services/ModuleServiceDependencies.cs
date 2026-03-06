
using Perfum.Services.IServices.PaymentMethods;
using Perfum.Services.IServices.Users;
using Perfum.Services.Services.PaymentMethods;
using Perfum.Services.Services.Users;

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

        #region Auth
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IRoleService, RoleService>();

        #endregion

        services.AddScoped<IOrderService, OrderService>();
        services.AddScoped<IOrderItemService, OrderItemService>();

        #region Users

        services.AddScoped<ICustomerService, CustomerService>();

        #endregion

        #region Payment Methods 

        services.AddScoped<IStripePaymentService, StripePaymentService>();

        #endregion
        return services;
    }

}

