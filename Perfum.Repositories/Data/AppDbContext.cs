namespace Perfum.Repositories.Data;

//  Add-Migration init -o "Data/Migrations"
public class AppDbContext : DbContext
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
    public DbSet<Category> Categories { get; set; }
    public DbSet<Product> Products { get; set; }
    #endregion

}
