using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Perfum.Domain.Models.Users;

namespace Perfum.Repositories.Data.Configuration.Users;

public class AdminConfiguration : IEntityTypeConfiguration<Admin>
{
    public void Configure(EntityTypeBuilder<Admin> builder)
    {
        builder.ToTable("Admins");
    }
}
