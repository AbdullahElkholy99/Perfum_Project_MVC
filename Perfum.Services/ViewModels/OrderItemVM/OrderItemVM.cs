

namespace Perfum.Services.ViewModels.OrderItemVM;

public record OrderItemVM
{
    public int Id { get; set; }

    public int Quantity { get; set; }

    public decimal UnitPrice { get; set; }


    public int OrderId { get; set; }

    public int ProductId { get; set; }
    
    public string? ProductName { get; set; }
}

public record AddOrderItemVM
{
    public int Quantity { get; set; }

    public decimal UnitPrice { get; set; }

    public int OrderId { get; set; }

    public int ProductId { get; set; }
}

public record EditOrderItemVM
{
    public int Quantity { get; set; }

    public decimal UnitPrice { get; set; }


    public int OrderId { get; set; }

    public int ProductId { get; set; }
}