using Perfum.Domain.Enums;
using Perfum.Services.ViewModels.Paginations;

namespace Perfum.Services.ViewModels.ProductVM;

public class ProductFilter : BasePaginationFilter
{
    public Status? Status { get; set; }
    public double? MinRating { get; set; }
    public double? MaxRating { get; set; }
    public decimal? PriceAsc { get; set; }
    public decimal? PriceDesc { get; set; }
}
public class DashBoardProduct
{
    public int? ActiveCategoryCount { get; set; }
    public int? InActiveCategoryCount { get; set; }
}
