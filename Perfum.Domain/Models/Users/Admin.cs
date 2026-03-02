namespace Perfum.Domain.Models.Users;

public class Admin : User
{



    public virtual ICollection<Category> Categories { get; set; } = null!;
} //TPT
