using System.ComponentModel.DataAnnotations.Schema;

namespace Perfum.Domain.Models;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }



    [ForeignKey(nameof(Category))]
    public int CategoryId { get; set; }
    public virtual Category Category { get; set; }

}
