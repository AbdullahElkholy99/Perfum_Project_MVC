namespace Perfum.MVC.Controllers;

public class CategoryController : Controller
{
    private readonly IServiceManager _serviceManager;

    public CategoryController(IServiceManager serviceManager)
    {
        _serviceManager = serviceManager;
    }

    // GET: /Category
    public async Task<IActionResult> Index(PagedResult<CategoryVM, CategoryFilter, DashBoardCategory>? filterCategory)
    {
        //var filter = new CategoryFilter(); 
        var result = await _serviceManager.CategoryService.GetAllAsync(filterCategory.Filter ?? new CategoryFilter())

                     ?? new PagedResult<CategoryVM, CategoryFilter, DashBoardCategory>
                     {
                         Items = new List<CategoryVM>(),
                         TotalCount = 0,
                         Filter = new CategoryFilter(),
                         DashboardVM = null
                     };

        return View(result);
    }

    // GET: /Category/Details/5
    public async Task<IActionResult> Details(int id)
    {
        var category = await _serviceManager.CategoryService.GetByIdAsync(id);
        if (category == null || category.Id == 0)
            return NotFound();

        return View(category);
    }

    // GET: /Category/Create
    [HttpGet]
    public IActionResult Create()
    {
        return View(new AddCategoryVM());
    }

    // POST: /Category/Create
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(AddCategoryVM model)
    {
        if (!ModelState.IsValid)
            return View(model);

        var result = await _serviceManager.CategoryService.AddAsync(model);
        if (result == "Success")
            return RedirectToAction(nameof(Index));

        ModelState.AddModelError(string.Empty, "Could not create category.");
        return View(model);
    }

    // GET: /Category/Edit/5
    [HttpGet]
    public async Task<IActionResult> Edit(int id)
    {
        var category = await _serviceManager.CategoryService.GetByIdAsync(id);
        if (category == null || category.Id == 0)
            return NotFound();

        var vm = new EditCategoryVM
        {
            Name = category.Name,
            Description = category.Description
        };

        return View(vm);
    }

    // POST: /Category/Edit/5
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(int id, EditCategoryVM model)
    {
        if (!ModelState.IsValid)
            return View(model);

        var result = await _serviceManager.CategoryService.UpdateAsync(id, model);
        if (result == "Success")
        {
            TempData["Success"] = "Category updated successfully.";
            return RedirectToAction(nameof(Index));
        }

        ModelState.AddModelError(string.Empty, "Could not update category.");
        return View(model);
    }

    // GET: /Category/Delete/5
    [HttpGet]
    public async Task<IActionResult> Delete(int id)
    {
        var category = await _serviceManager.CategoryService.GetByIdAsync(id);
        if (category == null || category.Id == 0)
            return NotFound();

        return View(category);
    }

    // POST: /Category/Delete/5
    [HttpPost, ActionName("Delete")]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> DeleteConfirmed(int id)
    {
        var result = await _serviceManager.CategoryService.DeleteAsync(id);
        if (result == "Success")
        {
            TempData["Success"] = "Category deleted successfully.";
            return RedirectToAction(nameof(Index));
        }

        return RedirectToAction(nameof(Delete), new { id });
    }
}
