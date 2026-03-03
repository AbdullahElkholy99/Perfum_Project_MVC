using Microsoft.AspNetCore.Mvc;
using Perfum.MVC.Models;
using Perfum.MVC.ViewModels;
using Perfum.Services.IServices.ManagerService;
using Perfum.Services.ViewModels.Paginations;
using System.Diagnostics;

namespace Perfum.MVC.Controllers;

public class ProductController : Controller
{
    private readonly IServiceManager _serviceManager;

    public ProductController(IServiceManager serviceManager)
    {
        _serviceManager = serviceManager;
    }

    public async Task<IActionResult> Index()
    {
        var result = await _serviceManager.ProductService.GetAllAsync();
        if (result == null)
            result = new PagedResult<ProductVM, ProductFilter, DashBoardProduct>
            {
                Items = new List<ProductVM>(),
                TotalCount = 0,
                Filter = null,
                DashboardVM = null
            };
        return View(result);
    }

    public async Task<IActionResult> Deatails(int id)
    {
        var product = await _serviceManager.ProductService.GetByIdAsync(id);
        if (product == null || product.Id == 0)
            return NotFound();
        return View(product);
    }

    [HttpGet]
    public async Task<IActionResult> Create()
    {
        var cats = await _serviceManager.CategoryService.GetAllAsync(null);

        var vm = new ProductCreatePageVM
        {
            Categories = cats?.Items ?? new List<CategoryVM>(),
            MyAddProductVm = new AddProductVM()
        };

        return View(vm);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(ProductCreatePageVM vm)
    {
        if (!ModelState.IsValid)
        {
            var cats = await _serviceManager.CategoryService.GetAllAsync(null);
            vm.Categories = cats?.Items ?? new List<CategoryVM>();
            return View(vm);
        }

        var result = await _serviceManager.ProductService.AddAsync(vm.MyAddProductVm);
        if (result == "Success")
            return RedirectToAction(nameof(Index));

        var reload = await _serviceManager.CategoryService.GetAllAsync(null);
        vm.Categories = reload?.Items ?? new List<CategoryVM>();
        ModelState.AddModelError("", "Could not create product.");
        return View(vm);
    }

    [HttpGet]
    public async Task<IActionResult> Edit(int id)
    {
        var product = await _serviceManager.ProductService.GetByIdAsync(id);
        if (product == null || product.Id == 0)
            return NotFound();
        var categories = await _serviceManager.CategoryService.GetAllAsync(null);
        ViewBag.Categories = categories?.Items ?? new List<CategoryVM>();
        var editModel = new EditProductVM
        {
            Name = product.Name,
            Descreption = product.Descreption,
            Price = product.Price,
            Size_Ml = product.Size_Ml,
            Concentration = product.Concentration,
            Stock = product.Stock,
            CategoryId = product.CategoryId
        };
        return View(editModel);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(int id, EditProductVM model)
    {
        if (ModelState.IsValid)
        {
            var result = await _serviceManager.ProductService.UpdateAsync(id, model);
            if (result == "Success")
            {
                TempData["Success"] = "Product updated successfully.";
                return RedirectToAction(nameof(Index));
            }
        }
        var categories = await _serviceManager.CategoryService.GetAllAsync(null);
        ViewBag.Categories = categories?.Items ?? new List<CategoryVM>();
        return View(model);
    }

    [HttpGet]
    public async Task<IActionResult> Delete(int id)
    {
        var product = await _serviceManager.ProductService.GetByIdAsync(id);
        if (product == null || product.Id == 0)
            return NotFound();
        return View(product);
    }

    [HttpPost, ActionName("Delete")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> DeleteConfirmed(int id)
    {
        var result = await _serviceManager.ProductService.DeleteAsync(id);
        if (result == "Success")
        {
            TempData["Success"] = "Product deleted successfully.";
            return RedirectToAction(nameof(Index));
        }
        return RedirectToAction(nameof(Delete), new { id });
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
