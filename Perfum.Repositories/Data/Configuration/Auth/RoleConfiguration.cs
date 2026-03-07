using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Perfum.Repositories.Data.Configurations.Auth;

public class RoleConfiguration : IEntityTypeConfiguration<IdentityRole<int>>
{
    public void Configure(EntityTypeBuilder<IdentityRole<int>> builder)
    {
        builder.HasData(
            new IdentityRole<int>
            {
                Id = 1,
                Name = "Customer",
                NormalizedName = "CUSTOMER",
                ConcurrencyStamp = "47d61672-7e17-482f-8d6b-46cf485edcb9"

            },
            new IdentityRole<int>
            {
                Id = 2,
                Name = "Admin",
                NormalizedName = "ADMIN",
                ConcurrencyStamp = "c3460194-85c0-492b-9f5c-285b4200fc8d"
            },
            new IdentityRole<int>
            {
                Id = 3,
                Name = "User",
                NormalizedName = "USER",
                ConcurrencyStamp = "b951ed47-bfec-44cb-8e4e-04bda222e1d8"

            }
        );
    }
}
public class UserConfiguration : IEntityTypeConfiguration<IdentityUser<int>>
{
    public void Configure(EntityTypeBuilder<IdentityUser<int>> builder)
    {
        builder.HasIndex(u => u.Email).IsUnique();
    }
}