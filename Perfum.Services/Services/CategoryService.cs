using Perfum.Repositories.IRepository.MangerRepository;
using Perfum.Services.IServices;
using Perfum.Services.ViewModels.CategoryVM;

namespace Perfum.Services.Services;

public class CategoryService : ICategoryService
{
    #region Fields 

    private readonly IRepositoryManager _repositoryManager;
    #endregion

    #region CTORs

    public CategoryService(IRepositoryManager repositoryManager)
    {
        _repositoryManager = repositoryManager;
    }

    #endregion

    #region Method Handlers 
    // --------------------- Create ---------------------
    public Task<string> AddAsync(AddCategoryVM model)
    {
        throw new NotImplementedException();
    }

    // --------------------- Read ---------------------
    public Task<IEnumerable<CategoryVM>> GetAllAsync()
    {
        throw new NotImplementedException();
    }

    public Task<CategoryVM> GetByIdAsync(int id)
    {
        throw new NotImplementedException();
    }

    // --------------------- Update ---------------------
    public Task<string> UpdateAsync(int id, EditCategoryVM model)
    {
        throw new NotImplementedException();
    }

    // --------------------- Delete ---------------------
    public Task<string> DeleteAsync(int id)
    {
        throw new NotImplementedException();
    }
    #endregion
}
