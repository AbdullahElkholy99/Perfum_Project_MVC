using Perfum.Domain.Models.Orders;

namespace Perfum.Domain.Models.Users;

public class Customer : User
{
    
    // Relationships
    public virtual List<Order> Orders { get; set; } = new List<Order>();

    public virtual List<Review> Reviews { get; set; } = new List<Review>();


}
