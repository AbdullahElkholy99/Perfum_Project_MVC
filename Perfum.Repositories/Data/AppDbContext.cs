
namespace Perfum.Repositories.Data;

//  Add-Migration init -o "Data/Migrations"
public class AppDbContext : IdentityDbContext<User, IdentityRole<int>, int>
{
    #region Ctors
    public AppDbContext() { }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    #endregion

    #region Methods

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);

    }
    #endregion

    #region DbSets

    #region Users 

    public DbSet<Admin> Admins { get; set; }
    public DbSet<Customer> Customers { get; set; }

    #endregion

    public DbSet<Category> Categories { get; set; }
    public DbSet<Product> Products { get; set; }
    #endregion

}
