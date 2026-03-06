
using Perfum.Domain.Models.Users;

namespace Perfum.Domain.Models;

public class Review
{
    [Key]
    public int Id { get; set; }
    public int Rating { get; set; }
    public string Comment { get; set; }
    public DateTime ReviewDate{ get; set; }


    // Relationships
    [ForeignKey(nameof(Customer))]
    public int CustomerId { get; set; }
    public virtual Customer Customer { get; set; }


    [ForeignKey(nameof(Product))]
    public int ProductId { get; set; }
    public virtual Product Product { get; set; }

}
