using Perfum.Services.ViewModels.Paginations;

namespace Perfum.Services.IServices;

public interface ICategoryService
{
    // --------------------- Create ---------------------
    Task<string> AddAsync(AddCategoryVM model);

    // --------------------- Read ---------------------
    Task<PagedResult<CategoryVM, CategoryFilter, DashBoardCategory>> GetAllAsync();
    Task<CategoryVM> GetByIdAsync(int id);

    // --------------------- Update ---------------------
    Task<string> UpdateAsync(int id, EditCategoryVM model);

    // --------------------- Delete ---------------------
    Task<string> DeleteAsync(int id);
}
