using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Perfum.Repositories;


public static class ModuleRepositoryDependencies
{
    public static IServiceCollection AddRepositoryDependencies
        (this IServiceCollection services, IConfiguration configuration)
    {
        // Configure SQL Server
        services.AddDbContext<AppDbContext>(options =>
        {
            options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
        });

        //AddScoped Generic Repository
        services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));

        //AddScoped Course Repository 
        services.AddScoped<IRepositoryManager, RepositoryManager>();


        return services;
    }

}
