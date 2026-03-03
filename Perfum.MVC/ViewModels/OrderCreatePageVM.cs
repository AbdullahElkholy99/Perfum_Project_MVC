using Microsoft.AspNetCore.Mvc.Rendering;
using Perfum.Services.ViewModels.OrderItemVM;
using Perfum.Services.ViewModels.OrderVM;

namespace Perfum.MVC.ViewModels
{
    public class OrderCreatePageVM
    {
        public AddOrderVM MyAddOrderVM { get; set; } = new();
        public List<OrderItemVM> OrderItemVMs { get; set; } = new();

        public IEnumerable<SelectListItem> OrderItemOptions =>
            OrderItemVMs.Select(c => new SelectListItem { Value = c.Id.ToString(), Text = c.ProductName });
    }
}
