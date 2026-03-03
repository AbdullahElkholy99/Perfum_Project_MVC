
using Perfum.Domain.Models.Orders;
using Perfum.MVC.Services;
using Perfum.Services.IServices.Orders;
using Perfum.Services.ViewModels.OrderVM;
using Perfum.Services.ViewModels.Paginations;

namespace Perfum.Services.Services.Orders;

public class OrderService : IOrderService
{
    #region Fields 

    private readonly IRepositoryManager _repositoryManager;
    private readonly IFileService _fileService;
    private readonly IMapper _mapper;

    #endregion


    #region CTORs
    public OrderService(IRepositoryManager repositoryManager, IMapper mapper, IFileService fileService)
    {
        _repositoryManager = repositoryManager;
        _mapper = mapper;
        _fileService = fileService;
    }
    #endregion



    #region Method Handlers 
    // --------------------- Create ---------------------
    public async Task<string> AddAsync(AddOrderVM model)
    {
        using var Transaction = _repositoryManager.OrderRepository.BeginTransaction();
        try
        {
            if (model == null)
                return "Fail";

            var Order = _mapper.Map<Order>(model);

            if (Order == null)
                return "Fail";


            await _repositoryManager.OrderRepository.AddAsync(Order);

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
    public async Task<PagedResult<OrderVM, OrderFilter, DashBoardOrder>> GetAllAsync()
    {
        try
        {
            // get all Orders as no traking 
            List<Order>? Orders = await _repositoryManager.OrderRepository.GetTableNoTracking().ToListAsync();

            //check for Orders
            if (Orders == null)
                return null;

            // map from Order to OrderVM
            var OrderVM = _mapper.Map<List<OrderVM>>(Orders);

            //check 
            if (OrderVM == null)
                return null;
            var result = new PagedResult<OrderVM, OrderFilter, DashBoardOrder>()
            {
                Items = OrderVM,
                DashboardVM = null,
                TotalCount = OrderVM.Count(),
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


    public async Task<OrderVM> GetByIdAsync(int id)
    {
        try
        {
            // get Order as traking 
            var Order = await _repositoryManager.OrderRepository.GetByIdAsync(id);

            //check for Order
            if (Order == null)
                return new OrderVM();

            // map from Order to OrderVM
            var OrderVM = _mapper.Map<OrderVM>(Order);

            //check 
            if (OrderVM == null)
                return new OrderVM();

            //return
            return OrderVM;
        }
        catch (Exception ex)
        {
            return new OrderVM();
        }
    }

    // --------------------- Update ---------------------
    public async Task<string> UpdateAsync(int id, EditOrderVM model)
    {
        try
        {
            // get Order as traking 
            var oldOrder = await _repositoryManager.OrderRepository.GetByIdAsync(id);

            //check for Order
            if (oldOrder == null)
                return "Fail";

            // map from new Order (model) to  old Order
            _mapper.Map(model, oldOrder);

            //save changes
            await _repositoryManager.OrderRepository.SaveChangesAsync();

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
            // get Order as traking 
            var removeOrder = await _repositoryManager.OrderRepository.GetByIdAsync(id);

            //check for Order
            if (removeOrder == null)
                return "Fail";

            //save changes
            await _repositoryManager.OrderRepository.DeleteAsync(removeOrder);

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
