

using Perfum.Domain.Enums;
using Perfum.Domain.Models.Orders;
using System.ComponentModel.DataAnnotations;

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
