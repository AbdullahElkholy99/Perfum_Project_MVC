using Perfum.Domain.Enums;


namespace Perfum.Domain.Models.Order;

public class Order
{
    public int Id { get; set; }

    public string ShippingAddress { get; set; }

    public DateTime Date { get; set; }

    public Status Status { get; set; }


    [ForeignKey(nameof(OrderItemId))]
    public virtual List<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    public int OrderItemId { get; set; }
}
