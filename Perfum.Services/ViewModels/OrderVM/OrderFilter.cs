
namespace Perfum.Services.ViewModels.OrderVM;

public class OrderFilter : BasePaginationFilter
{
    public DateTime? Date { get; set; }
    public int? Status { get; set; }
    public decimal TotalPrice { get; set; }
}

public class DashBoardOrder
{
    public int? ActiveOrderCount { get; set; }
    public int? InActiveOrderCount { get; set; }
    public int? PendingOrderCount { get; set; }
    public int? ExpiredOrderCount { get; set; }
}


