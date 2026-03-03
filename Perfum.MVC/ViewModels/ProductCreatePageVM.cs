using Microsoft.AspNetCore.Mvc.Rendering;
using Perfum.Services.ViewModels.CategoryVM;
using Perfum.Services.ViewModels.ProductVM;

namespace Perfum.MVC.ViewModels;

public class ProductCreatePageVM
{
    public AddProductVM MyAddProductVm { get; set; } = new();
    public List<CategoryVM> Categories { get; set; } = new();

    public IEnumerable<SelectListItem> CategoryOptions =>
        Categories.Select(c => new SelectListItem { Value = c.Id.ToString(), Text = c.Name });
}