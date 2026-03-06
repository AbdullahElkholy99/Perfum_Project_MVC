

using Perfum.Domain.Enums;
using Perfum.Domain.Models.Orders;

namespace Perfum.Services.ViewModels.OrderVM;

public record OrderVM
{
    public int Id { get; set; }

    public string ShippingAddress { get; set; }

    public DateTime? Date { get; set; }

    public Status Status { get; set; }

    public decimal TotalPrice { get; set; }

    public List<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

}


public record AddOrderVM
{
    public string ShippingAddress { get; set; }

    public DateTime? Date { get; set; }

    public Status Status { get; set; }
    public decimal TotalPrice { get; set; }

    public List<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

}

public record EditOrderVM
{
    public string ShippingAddress { get; set; }

    public DateTime? Date { get; set; }

    public Status Status { get; set; }
    public decimal TotalPrice { get; set; }

    public List<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

}


// by abdullah ali

public record OrderDTO
{
    public int deliveryMethodId { get; set; }

    public string basketId { get; set; }
    public ShipAddressDTO shipAddress { get; set; }
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
