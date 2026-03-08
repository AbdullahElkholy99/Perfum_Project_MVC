namespace Perfum.Domain.Models.Orders;

//public class CustomerBasket
//{
//    public int Id { get; set; }   // CustomerId  
//    public int CustomerId { get; set; }   // CustomerId  
//    public string PaymentIntentId { get; set; }
//    public string ClientSecret { get; set; }


//    public List<BasketItem> Items { get; set; } = new List<BasketItem>();

//    public decimal SubTotal => Items.Sum(x => x.Price * x.Quantity);

//    public decimal Shipping => SubTotal >= 250 ? 0 : 18;

//    public decimal Discount => SubTotal >= 400 ? Math.Round(SubTotal * 0.05m, 2) : 0;

//    public decimal Total => SubTotal + Shipping - Discount;
//}
//public class BasketItem
//{
//    public int Id { get; set; }
//    public int ProductId { get; set; }

//    public string ProductName { get; set; }
//    public string Description { get; set; }

//    public decimal Price { get; set; }

//    public string ImageUrl { get; set; }

//    public int Quantity { get; set; }

//    public int Stock { get; set; }

//    public int SizeMl { get; set; }
//    public string? Category { get; set; }


//}



public class CustomerBasket
{
    public CustomerBasket()
    {

    }
    public CustomerBasket(string id)
    {
        Id = id;
    }
    public string Id { get; set; } //key

    public string PaymentIntentId { get; set; }
    public string ClientSecret { get; set; }
    public List<BasketItem> basketItems { get; set; } = new List<BasketItem>(); //value
}
public class BasketItem
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string Image { get; set; }
    public int Quantity { get; set; }
    public decimal Price { get; set; }
    public string Category { get; set; }
}