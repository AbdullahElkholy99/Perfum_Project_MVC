using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Perfum.Repositories.Data.Configuration.Users;

public class CustomerConfiguration : IEntityTypeConfiguration<Customer>
{
    public void Configure(EntityTypeBuilder<Customer> builder)
    {
        builder.ToTable("Customers");
    }
}

