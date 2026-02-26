
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Perfum.Repositories.Data.Configuration;

partial class CategoryConfiguration : IEntityTypeConfiguration<Category>
{
    public void Configure(EntityTypeBuilder<Category> builder)
    {
        builder.HasMany(c => c.Products)
            .WithOne(p => p.Category)
            .HasForeignKey(p => p.CategoryId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasKey("Id");

    }
}
