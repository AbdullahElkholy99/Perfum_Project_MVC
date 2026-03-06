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

    // By Abdullah Ali
    public DeliveryMethod? deliveryMethod { get; set; }
    public string PaymentIntentId { get; set; }
    public string? ClientSecret { get; set; }
    public string? BuyerEmail { get; set; }
    public decimal GetTotal()
    {
        return TotalPrice + deliveryMethod.Price;
    }
    public ShippingAddress shippingAddress { get; set; }
    public Order(string buyerEmail, decimal subTotal, ShippingAddress shippingAddress, DeliveryMethod deliveryMethod, List<OrderItem> orderItems, string PaymentIntentId)
    {
        BuyerEmail = buyerEmail;
        TotalPrice = subTotal;
        shippingAddress = shippingAddress;
        this.deliveryMethod = deliveryMethod;
        this.OrderItems = orderItems;
        this.PaymentIntentId = PaymentIntentId;
    }
    // ----------- 

}
