using Perfum.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Perfum.Domain.Models.Order;

public class OrderItem
{
    public int Id { get; set; }

    public int Quantity { get; set; }

    public decimal UnitPrice { get; set; }

    public virtual Order Order { get; set; }

}
