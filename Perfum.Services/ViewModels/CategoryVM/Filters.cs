using Perfum.Domain.Enums;
using Perfum.Services.ViewModels.Paginations;

namespace Perfum.Services.ViewModels.CategoryVM;

public class CategoryFilter : BasePaginationFilter
{
    public Status? Status { get; set; }
}
public class DashBoardCategory
{
    public int? ActiveCategoryCount { get; set; }
    public int? InActiveCategoryCount { get; set; }
}
