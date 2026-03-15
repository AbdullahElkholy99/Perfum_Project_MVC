using Perfum.Domain.Enums;
using Perfum.Domain.Models.Users;


namespace Perfum.Domain.Models.Orders;

public class Order
{
    [Key]
    public int Id { get; set; }

    public DateTime? Date { get; set; } = DateTime.Now;

    public Status Status { get; set; }

    public decimal TotalPrice { get; set; }

    public string ShippingAddress { get; set; }

    // Relationships
    public virtual List<OrderItem> OrderItems { get; set; } = new List<OrderItem>();


    [ForeignKey(nameof(Customer))]
    public int CustomerId { get; set; }
    public virtual Customer Customer { get; set; }


    // By Abdullah Ali
    public DeliveryMethod? DdeliveryMethod { get; set; }
    public string? ClientSecret { get; set; }
    public string? BuyerEmail { get; set; }
    public decimal GetTotal()
    {
        return TotalPrice + DdeliveryMethod.Price;
    }
    public ShippingAddress? ShippingAddressDetails { get; set; } = null;
    public Order() { }

    public Order(int customerId, string buyerEmail, decimal subTotal,
        ShippingAddress shippingAddress, DeliveryMethod deliveryMethod,
        List<OrderItem> orderItems)
    {
        CustomerId = customerId;
        BuyerEmail = buyerEmail;
        TotalPrice = subTotal;
        ShippingAddressDetails = shippingAddress;
        DdeliveryMethod = deliveryMethod;
        OrderItems = orderItems;
    }


}
