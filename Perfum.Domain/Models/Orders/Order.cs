using Perfum.Domain.Enums;


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

}
