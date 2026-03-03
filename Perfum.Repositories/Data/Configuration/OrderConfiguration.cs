
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Perfum.Repositories.Data.Configuration;

partial class OrderConfiguration : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {

        builder
            .Property(o => o.TotalPrice)
            .HasColumnType("decimal(18,2)");

    }
}
