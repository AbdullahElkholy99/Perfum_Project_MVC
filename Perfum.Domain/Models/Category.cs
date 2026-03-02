
using Perfum.Domain.Models.Users;

namespace Perfum.Domain.Models;

public class Category
{
    public int Id { get; set; }
    public string Name { get; set; }


    [ForeignKey(nameof(Admin))]
    public int AddedByID { get; set; }
    public Admin Admin { get; set; }

    public virtual ICollection<Product> Products { get; set; }
}
