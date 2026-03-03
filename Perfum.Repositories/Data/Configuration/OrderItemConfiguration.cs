
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Perfum.Repositories.Data.Configuration;

partial class OrderItemConfiguration : IEntityTypeConfiguration<OrderItem>
{
    public void Configure(EntityTypeBuilder<OrderItem> builder)
    {
        builder
        .Property(o => o.UnitPrice)
        .HasColumnType("decimal(18,2)");


    }
}
