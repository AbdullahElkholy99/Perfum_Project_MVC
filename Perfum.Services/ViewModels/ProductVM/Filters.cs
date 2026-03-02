using Perfum.Domain.Enums;
using Perfum.Services.ViewModels.Paginations;
using System;
using System.Collections.Generic;
using System.Text;

namespace Perfum.Services.ViewModels.ProductVM;

public class ProductFilter : BasePaginationFilter
{
    public Status? Status { get; set; }
    public double? MinRating { get; set; }
    public decimal? Price { get; set; }
}
public class DashBoardProduct
{
    public int? ActiveCategoryCount { get; set; }
    public int? InActiveCategoryCount { get; set; }
}
