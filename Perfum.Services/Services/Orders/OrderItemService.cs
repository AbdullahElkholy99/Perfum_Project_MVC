
using Perfum.Domain.Models.Orders;
using Perfum.MVC.Services;
using Perfum.Services.IServices.Orders;
using Perfum.Services.ViewModels.OrderItemVM;

namespace Perfum.Services.Services.OrderItems;

public class OrderItemService : IOrderItemService
{
    #region Fields 

    private readonly IRepositoryManager _repositoryManager;
    private readonly IFileService _fileService;
    private readonly IMapper _mapper;

    #endregion


    #region CTORs
    public OrderItemService(IRepositoryManager repositoryManager, IMapper mapper, IFileService fileService)
    {
        _repositoryManager = repositoryManager;
        _mapper = mapper;
        _fileService = fileService;
    }
    #endregion



    #region Method Handlers 
    // --------------------- Create ---------------------
    public async Task<string> AddAsync(AddOrderItemVM model)
    {
        using var Transaction = _repositoryManager.OrderItemRepository.BeginTransaction();
        try
        {
            if (model == null)
                return "Fail";

            var OrderItem = _mapper.Map<OrderItem>(model);

            if (OrderItem == null)
                return "Fail";


            await _repositoryManager.OrderItemRepository.AddAsync(OrderItem);

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

    public async Task<List<OrderItemVM>> GetAllByOrderIdAsync(int OrderId)
    {
        try
        {
            // get all OrderItems by order id as no traking
            List<OrderItem>? OrderItems = await _repositoryManager.OrderItemRepository.GetAllByOrderId(OrderId).ToListAsync();

            //check for OrderItems
            if (OrderItems == null)
                return null;

            // map from OrderItem to OrderItemVM
            List<OrderItemVM> OrderItemVM = _mapper.Map<List<OrderItemVM>>(OrderItems);

            //check 
            if (OrderItemVM == null)
                return null;

            return OrderItemVM;
        }
        catch (Exception ex)
        {
            return null;
        }
    }


    public async Task<OrderItemVM> GetByIdAsync(int id)
    {
        try
        {
            // get OrderItem as traking 
            var OrderItem = await _repositoryManager.OrderItemRepository.GetByIdAsync(id);

            //check for OrderItem
            if (OrderItem == null)
                return new OrderItemVM();

            // map from OrderItem to OrderItemVM
            var OrderItemVM = _mapper.Map<OrderItemVM>(OrderItem);

            //check 
            if (OrderItemVM == null)
                return new OrderItemVM();

            //return
            return OrderItemVM;
        }
        catch (Exception ex)
        {
            return new OrderItemVM();
        }
    }

    // --------------------- Update ---------------------
    public async Task<string> UpdateAsync(int id, EditOrderItemVM model)
    {
        try
        {
            // get OrderItem as traking 
            var oldOrderItem = await _repositoryManager.OrderItemRepository.GetByIdAsync(id);

            //check for OrderItem
            if (oldOrderItem == null)
                return "Fail";

            // map from new OrderItem (model) to  old OrderItem
            _mapper.Map(model, oldOrderItem);

            //save changes
            await _repositoryManager.OrderItemRepository.SaveChangesAsync();

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
            // get OrderItem as traking 
            var removeOrderItem = await _repositoryManager.OrderItemRepository.GetByIdAsync(id);

            //check for OrderItem
            if (removeOrderItem == null)
                return "Fail";

            //save changes
            await _repositoryManager.OrderItemRepository.DeleteAsync(removeOrderItem);

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
