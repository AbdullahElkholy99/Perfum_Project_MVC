
namespace Perfum.Domain.Models.Orders;

public class OrderItem
{
    [Key]
    public int Id { get; set; }


    public int Quantity { get; set; }

    public decimal UnitPrice { get; set; }



    // Relationships
    [ForeignKey(nameof(Order))]
    public int OrderId { get; set; }
    public virtual Order Order { get; set; }


    [ForeignKey(nameof(Product))]
    public int ProductId { get; set; }
    public virtual Product Product { get; set; }



}
