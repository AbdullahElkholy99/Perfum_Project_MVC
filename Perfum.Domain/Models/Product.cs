using Perfum.Domain.Models.Orders;

namespace Perfum.Domain.Models;

public class Product
{
    public int Id { get; set; }

    [Required]
    public string Name { get; set; }

    public string? Descreption { get; set; }

    [Required]
    public double Price { get; set; }

    [Required]
    public double Size_Ml { get; set; }

    public string? ImageUrl { get; set; }

    public string? Concentration { get; set; }

    public int Stock { get; set; }


    // Relationships
    [ForeignKey(nameof(Category))]
    public int CategoryId { get; set; }
    public virtual Category Category { get; set; }


    public virtual List<OrderItem> OrderItems { get; set; } = new List<OrderItem>();


}
