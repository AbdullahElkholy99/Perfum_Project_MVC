
namespace Perfum.Services.ViewModels.OrderVM;

public record OrderVM
{
    public int Id { get; set; }

    public string ShippingAddress { get; set; }

    public DateTime? Date { get; set; }

    public Status Status { get; set; }

    public decimal TotalPrice { get; set; }

    public int CustomerId { get; set; }

    public List<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

}


public record AddOrderVM
{
    public string ShippingAddress { get; set; }

    public DateTime? Date { get; set; }

    public Status Status { get; set; }
    public decimal TotalPrice { get; set; }

    public int CustomerId { get; set; }   

    public List<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

}

public record EditOrderVM
{
    public string ShippingAddress { get; set; }

    public DateTime? Date { get; set; }

    public Status Status { get; set; }
    public decimal TotalPrice { get; set; }
    public int CustomerId { get; set; }

    public List<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

}


// by abdullah ali

public record CreateOrderPaymentVM
{
    public string BuyerEmail { get; set; }
    public int DeliveryMethodId { get; set; }

    public string BasketId { get; set; }
    public ShipAddressDTO ShipAddress { get; set; }
}
public record ShipAddressDTO
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string City { get; set; }
    public string ZipCode { get; set; }
    public string Street { get; set; }
    public string State { get; set; }
}
