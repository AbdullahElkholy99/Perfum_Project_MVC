namespace Perfum.Services.ViewModels.PaymentMethodsVM;

public class CustomerBasketVM
{
    public string Id { get; set; }   // CustomerId  

    public List<BasketItemVM> Items { get; set; } = new List<BasketItemVM>();

    public double SubTotal => Items.Sum(x => x.Price * x.Quantity);

    public double Shipping => SubTotal >= 250 ? 0 : 18;

    public double Discount => SubTotal >= 400 ? Math.Round(SubTotal * 0.05, 2) : 0;

    public double Total => SubTotal + Shipping - Discount;
}
public class BasketItemVM
{
    public int ProductId { get; set; }

    public string ProductName { get; set; }

    public double Price { get; set; }

    public string? ImageUrl { get; set; }

    public int Quantity { get; set; }

    public int Stock { get; set; }

    public int SizeMl { get; set; }
}