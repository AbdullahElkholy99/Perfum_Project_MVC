
namespace Perfum.Domain.Models.Users;

public class User : IdentityUser
{
    [MaxLength(500)]
    public string Address { get; set; }

    [MaxLength(50)]
    public string FirstName { get; set; }
    [MaxLength(50)]

    public string LastName { get; set; }


    [NotMapped]
    public IFormFile? ImageFile { get; set; }

    public string? ImagePath { get; set; }
}
