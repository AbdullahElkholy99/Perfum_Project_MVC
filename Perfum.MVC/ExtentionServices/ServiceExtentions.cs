
namespace Perfum.MVC.ExtentionServices;

public static class ServiceExtentions
{
    public static void IdentityService(this IServiceCollection services)
    {
        services
          .AddIdentity<User, IdentityRole<int>>(options =>
          {
              options.Password.RequireDigit = false;
              options.Password.RequiredLength = 1;
              options.Password.RequireUppercase = false;
              options.Password.RequireLowercase = false;
              options.Password.RequireNonAlphanumeric = false;
              options.Password.RequiredUniqueChars = 1;

              // Lockout settings
              options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
              options.Lockout.MaxFailedAccessAttempts = 5;
              options.Lockout.AllowedForNewUsers = true;

              // User settings
              options.User.RequireUniqueEmail = true;

              options.SignIn.RequireConfirmedEmail = true;

              options.User.AllowedUserNameCharacters =
                  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+ " +
                  "ابتثجحخدذرزسشصضطظعغفقكلمنهويءىةآأإؤئ";

          })
            .AddEntityFrameworkStores<AppDbContext>()
            .AddDefaultTokenProviders();


    }
    public static void PolicyService(this IServiceCollection services)
    {

        services.AddAuthorization(options =>
        {
            options.AddPolicy("ViewProducts",
                policy => policy.RequireClaim("Permission", Permissions.ViewProducts));

            options.AddPolicy("DeleteProducts",
                policy => policy.RequireClaim("Permission", Permissions.DeleteProducts));
        });
    }

}
