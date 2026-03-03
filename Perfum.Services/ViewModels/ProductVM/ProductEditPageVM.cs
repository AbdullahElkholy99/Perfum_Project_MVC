using System;
using System.Collections.Generic;
using System.Text;

using Perfum.Services.ViewModels.ProductVM;
using Perfum.Services.ViewModels.CategoryVM;

namespace Perfum.MVC.ViewModels;

public class ProductEditPageVM
{
    public EditProductVM Product { get; set; } = new();
    public List<CategoryVM> Categories { get; set; } = new();
}
