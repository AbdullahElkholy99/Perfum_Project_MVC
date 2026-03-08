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


    // Relationships
    public virtual List<OrderItem> OrderItems { get; set; } = new List<OrderItem>();


    [ForeignKey(nameof(Customer))]
    public int CustomerId { get; set; }
    public virtual Customer Customer { get; set; }

    // By Abdullah Ali
    public DeliveryMethod? DdeliveryMethod { get; set; }
    public string PaymentIntentId { get; set; }
    public string? ClientSecret { get; set; }
    public string? BuyerEmail { get; set; }
    public decimal GetTotal()
    {
        return TotalPrice + DdeliveryMethod.Price;
    }
    public ShippingAddress ShippingAddress { get; set; }
    public Order()
    {

    }
    public Order(int customerId, string buyerEmail, decimal subTotal,
        ShippingAddress shippingAddress, DeliveryMethod deliveryMethod,
        List<OrderItem> orderItems, string paymentIntentId)
    {
        CustomerId = customerId;
        BuyerEmail = buyerEmail;
        TotalPrice = subTotal;
        ShippingAddress = shippingAddress;
        DdeliveryMethod = deliveryMethod;
        OrderItems = orderItems;
        PaymentIntentId = paymentIntentId;
    }
<<<<<<< HEAD


=======
>>>>>>> 04918c5855757e9612ba90708551b5ee25632177
    // ----------- 

}
