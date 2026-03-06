
namespace Perfum.Services.ViewModels.UserVM;

public class CustomersFilter : BasePaginationFilter
{
    public string UserName { get; set; }

    public string Email { get; set; }

    public int OrdersCount { get; set; }

    public double? Paid { get; set; }
}
public class DashBoardCustomer
{
    public int? CustomersCount { get; set; }
    public int? BestCustomersCount { get; set; }
    public int? NormalCustomersCount { get; set; }
    public int? LowCustomersCount { get; set; }
}

