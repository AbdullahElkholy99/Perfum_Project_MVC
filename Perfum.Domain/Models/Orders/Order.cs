using Perfum.Domain.Enums;
using Perfum.Domain.Models.Users;


namespace Perfum.Domain.Models.Orders;

public class Order
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string ShippingAddress { get; set; }

    public DateTime? Date { get; set; } = DateTime.Now;

    public Status Status { get; set; }

    public decimal TotalPrice { get; set; }


    // Relationships
    public virtual List<OrderItem> OrderItems { get; set; } = new List<OrderItem>();


    [ForeignKey(nameof(Customer))]
    public int CustomerId { get; set; }
    public virtual Customer Customer { get; set; }


}
