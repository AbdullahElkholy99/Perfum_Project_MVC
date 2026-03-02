
namespace Perfum.Domain.Models.Users;

public class User : IdentityUser<int>
{
    [MaxLength(500)]
    public string Address { get; set; }


    [NotMapped]
    public IFormFile? ImageFile { get; set; }

    public string? ImagePath { get; set; }
}
