

namespace Perfum.MVC.ViewModels;

public class ProductCreatePageVM
{
    public AddProductVM MyAddProductVm { get; set; } = new();
    public List<CategoryVM> Categories { get; set; } = new();
}