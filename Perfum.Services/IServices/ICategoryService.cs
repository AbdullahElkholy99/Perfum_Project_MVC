using Perfum.Services.ViewModels.CategoryVM;

namespace Perfum.Services.IServices;

public interface ICategoryService
{
    // --------------------- Create ---------------------
    Task<string> AddAsync(AddCategoryVM model);

    // --------------------- Read ---------------------
    Task<IEnumerable<CategoryVM>> GetAllAsync();
    Task<CategoryVM> GetByIdAsync(int id);

    // --------------------- Update ---------------------
    Task<string> UpdateAsync(int id, EditCategoryVM model);

    // --------------------- Delete ---------------------
    Task<string> DeleteAsync(int id);
}
