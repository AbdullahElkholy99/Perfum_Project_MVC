using Perfum.Services.ViewModels.Paginations;
using Perfum.Services.ViewModels.ProductVM;
using System;
using System.Collections.Generic;
using System.Text;

namespace Perfum.Services.IServices
{
    public interface IProductService
    {
        // --------------------- Create ---------------------
        Task<string> AddAsync(AddProductVM model);

        // --------------------- Read ---------------------
        Task<PagedResult<ProductVM, ProductFilter, DashBoardProduct>> GetAllAsync();
        Task<ProductVM> GetByIdAsync(int id);

        // --------------------- Update ---------------------
        Task<string> UpdateAsync(int id, EditProductVM model);

        // --------------------- Delete ---------------------
        Task<string> DeleteAsync(int id);
    }
}
