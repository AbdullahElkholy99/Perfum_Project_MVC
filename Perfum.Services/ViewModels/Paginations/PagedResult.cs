using Perfum.Domain.Enums;

namespace Perfum.Services.ViewModels.Paginations;

public class PagedResult<T, TFilter, TDashboard>
{
    public List<T> Items { get; set; }
    public int TotalCount { get; set; }
    public TFilter? Filter { get; set; }
    public TDashboard? DashboardVM { get; set; }
}

public abstract class BasePaginationFilter
{
    private const int MaxPageSize = 20;

    public int PageNumber { get; set; } = 1;

    private int _pageSize = 10;
    public int PageSize
    {
        get => _pageSize;
        set => _pageSize = value > MaxPageSize ? MaxPageSize : value;
    }

    public string? SearchByName { get; set; }
    public Gender? Gender { get; set; }
    public Status? Status { get; set; }
    public SortedBy? SortBy { get; set; }
}
public class TraineeFilter : BasePaginationFilter
{
}
public class AdminFilter : BasePaginationFilter
{
}
public class TrainerFilter : BasePaginationFilter
{
    public double? MinRating { get; set; }
    public bool? HasSessionsToday { get; set; }

}