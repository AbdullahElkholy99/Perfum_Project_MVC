using Perfum.MVC.Services;
using Perfum.Services.ViewModels.Paginations;
using Perfum.Services.ViewModels.ProductVM;

namespace Perfum.Services.Services;

public class ProductService : IProductService
{
    #region Fields 

    private readonly IRepositoryManager _repositoryManager;
    private readonly IFileService _fileService;

    private readonly IMapper _mapper;

    #endregion

    #region CTORs

    public ProductService(IRepositoryManager repositoryManager, IMapper mapper, IFileService fileService)
    {
        _repositoryManager = repositoryManager;
        _mapper = mapper;
        _fileService = fileService;
    }

    #endregion

    #region Method Handlers 
    // --------------------- Create ---------------------
    public async Task<string> AddAsync(AddProductVM model)
    {
        using var Transaction = _repositoryManager.ProductRepository.BeginTransaction();
        try
        {
            if (model == null)
                return "Fail";

            var product = _mapper.Map<Product>(model);

            if (product == null)
                return "Fail";

            // save image
            string path = await _fileService.SaveImageAsync(model.ImageUrl, "Images/product");

            product.ImageUrl = path;

            await _repositoryManager.ProductRepository.AddAsync(product);

            Transaction.Commit();

            return "Success";
        }
        catch (Exception ex)
        {
            Transaction.Rollback();
            return "Fail";
        }
    }

    // --------------------- Read ---------------------

    public async Task<PagedResult<ProductVM, ProductFilter, DashBoardProduct>> GetAllAsync()
    {
        try
        {
            // get all Products as no traking 
            List<Product>? Products = await _repositoryManager.ProductRepository.GetTableNoTracking().ToListAsync();

            //check for Products
            if (Products == null)
                return null;

            // map from Product to ProductVM
            var productVM = _mapper.Map<List<ProductVM>>(Products);

            //check 
            if (productVM == null)
                return null;
            var result = new PagedResult<ProductVM, ProductFilter, DashBoardProduct>()
            {
                Items = productVM,
                DashboardVM = null,
                TotalCount = productVM.Count(),
                Filter = null
            };
            //return
            return result;
        }
        catch (Exception ex)
        {
            return null;
        }
    }

    public async Task<ProductVM> GetByIdAsync(int id)
    {
        try
        {
            // get Product as traking 
            var Product = await _repositoryManager.ProductRepository.GetByIdAsync(id);

            //check for Product
            if (Product == null)
                return new ProductVM();

            // map from Product to ProductVM
            var ProductVM = _mapper.Map<ProductVM>(Product);

            //check 
            if (ProductVM == null)
                return new ProductVM();

            //return
            return ProductVM;
        }
        catch (Exception ex)
        {
            return new ProductVM();
        }
    }

    // --------------------- Update ---------------------
    public async Task<string> UpdateAsync(int id, EditProductVM model)
    {
        try
        {
            // get Product as traking 
            var oldProduct = await _repositoryManager.ProductRepository.GetByIdAsync(id);

            //check for Product
            if (oldProduct == null)
                return "Fail";

            // map from new Product (model) to  old Product
            _mapper.Map(model, oldProduct);

            //save changes
            await _repositoryManager.ProductRepository.SaveChangesAsync();

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
            // get Product as traking 
            var removeProduct = await _repositoryManager.ProductRepository.GetByIdAsync(id);

            //check for Product
            if (removeProduct == null)
                return "Fail";

            //save changes
            await _repositoryManager.ProductRepository.DeleteAsync(removeProduct);

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
