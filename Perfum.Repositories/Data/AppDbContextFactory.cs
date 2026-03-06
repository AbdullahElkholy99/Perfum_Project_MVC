using Microsoft.EntityFrameworkCore.Design;

namespace Perfum.Repositories.Data;


/*
 this class : use to solve problem : 
Unable to create a 'DbContext' of type 'AppDbContext'. The exception 'No database provider has been configured for this DbContext. A provider can be configured by overriding the 'DbContext.OnConfiguring' method or by using 'AddDbContext' on the application service provider. If 'AddDbContext' is used, then also ensure that your DbContext type accepts a DbContextOptions<TContext> object in its constructor and passes it to the base constructor for DbContext.' was thrown while attempting to create an instance. For the different patterns supported at design time, see https://go.microsoft.com/fwlink/?linkid=851728
 
 */
public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
{
    public AppDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();

        optionsBuilder.UseSqlServer(
            "Server=db43420.public.databaseasp.net ; Database=db43420; User Id=db43420; Password=r+2G8hC_R=k7; Encrypt=False; MultipleActiveResultSets=True;  "
        );

        return new AppDbContext(optionsBuilder.Options);
    }
}