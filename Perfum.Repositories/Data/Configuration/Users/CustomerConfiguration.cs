using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Perfum.Domain.Models.Users;

namespace Perfum.Repositories.Data.Configuration.Users;

public class CustomerConfiguration : IEntityTypeConfiguration<Customer>
{
    public void Configure(EntityTypeBuilder<Customer> builder)
    {
        builder.ToTable("Customers");
    }
}
