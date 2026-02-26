
namespace Perfum.Services.Services;

public class CategoryService : ICategoryService
{
    #region Fields 

    private readonly IRepositoryManager _repositoryManager;
    private readonly IMapper _mapper;
    #endregion

    #region CTORs

    public CategoryService(IRepositoryManager repositoryManager, IMapper mapper)
    {
        _repositoryManager = repositoryManager;
        _mapper = mapper;
    }

    #endregion

    #region Method Handlers 
    // --------------------- Create ---------------------
    public async Task<string> AddAsync(AddCategoryVM model)
    {
        try
        {
            if (model == null)
                return "Fail";

            var category = _mapper.Map<Category>(model);
            if (category == null)
                return "Fail";

            await _repositoryManager.CategoryRepository.AddAsync(category);

            return "Success";
        }
        catch (Exception ex)
        {
            return "Fail";
        }
    }

    // --------------------- Read ---------------------
    public async Task<IEnumerable<CategoryVM>> GetAllAsync()
    {
        try
        {
            // get all categories as no traking 
            var categories = await _repositoryManager.CategoryRepository.GetTableNoTracking().ToListAsync();

            //check for categories
            if (categories == null)
                return Enumerable.Empty<CategoryVM>();

            // map from category to categoryVM
            var categoriesVM = _mapper.Map<List<CategoryVM>>(categories);

            //check 
            if (categoriesVM == null)
                return Enumerable.Empty<CategoryVM>();

            //return
            return categoriesVM;
        }
        catch (Exception ex)
        {
            return Enumerable.Empty<CategoryVM>();
        }
    }

    public async Task<CategoryVM> GetByIdAsync(int id)
    {
        try
        {
            // get category as traking 
            var category = await _repositoryManager.CategoryRepository.GetByIdAsync(id);

            //check for category
            if (category == null)
                return new CategoryVM();

            // map from category to categoryVM
            var categoryVM = _mapper.Map<CategoryVM>(category);

            //check 
            if (categoryVM == null)
                return new CategoryVM();

            //return
            return categoryVM;
        }
        catch (Exception ex)
        {
            return new CategoryVM();
        }
    }

    // --------------------- Update ---------------------
    public async Task<string> UpdateAsync(int id, EditCategoryVM model)
    {
        try
        {
            // get category as traking 
            var oldCategory = await _repositoryManager.CategoryRepository.GetByIdAsync(id);

            //check for category
            if (oldCategory == null)
                return "Fail";

            // map from new category (model) to  old category
            _mapper.Map(model, oldCategory);

            //save changes
            await _repositoryManager.CategoryRepository.SaveChangesAsync();

            //return
            return "Success";
        }
        catch (Exception ex)
        {
            return "Fail";
        }
    }

    // --------------------- Delete ---------------------
    public async Task<string> DeleteAsync(int id)
    {
        try
        {
            // get category as traking 
            var removeCategory = await _repositoryManager.CategoryRepository.GetByIdAsync(id);

            //check for category
            if (removeCategory == null)
                return "Fail";

            //save changes
            await _repositoryManager.CategoryRepository.DeleteAsync(removeCategory);

            //return
            return "Success";
        }
        catch (Exception ex)
        {
            return "Fail";
        }
    }
    #endregion
}
