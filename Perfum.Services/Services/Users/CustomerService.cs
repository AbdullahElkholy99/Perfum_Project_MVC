
using Perfum.Domain.Models.Orders;
using Perfum.Services.IServices.Users;

namespace Perfum.Services.Services.Users;

public class CustomerService : ICustomerService
{

    #region Fields 

    private readonly IRepositoryManager _repositoryManager;
    private readonly IFileService _fileService;

    private readonly IMapper _mapper;

    #endregion

    #region CTORs

    public CustomerService(IRepositoryManager repositoryManager, IMapper mapper, IFileService fileService)
    {
        _repositoryManager = repositoryManager;
        _mapper = mapper;
        _fileService = fileService;
    }

    #endregion

    #region Method Handlers 
    // --------------------- Create ---------------------
    public async Task<string> AddAsync(AddCustomerVM model)
    {
        using var Transaction = _repositoryManager.CustomerRepository.BeginTransaction();
        try
        {
            if (model == null)
                return "Fail";

            var Customer = _mapper.Map<Customer>(model);

            if (Customer == null)
                return "Fail";

            // save image
            string path = await _fileService.SaveImageAsync(model.ImageUrl, "Images/Customer");

            Customer.ImagePath = path;

            await _repositoryManager.CustomerRepository.AddAsync(Customer);

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

    public async Task<PagedResult<CustomerVM, CustomersFilter, DashBoardCustomer>> GetAllAsync(CustomersFilter? filter)
    {
        try
        {
            // get all Customers as no traking 
            List<Customer>? Customers = await _repositoryManager.CustomerRepository.GetTableNoTracking().ToListAsync();

            //check for Customers
            if (Customers == null)
                return null;

            // map from Customer to CustomerVM
            var CustomerVM = _mapper.Map<List<CustomerVM>>(Customers);

            //check 
            if (CustomerVM == null)
                return null;

            //if(filter !=null){}


            var result = new PagedResult<CustomerVM, CustomersFilter, DashBoardCustomer>()
            {
                Items = CustomerVM,
                DashboardVM = null,
                TotalCount = CustomerVM.Count(),
                Filter = filter
            };

            //return
            return result;
        }
        catch (Exception ex)
        {
            return null;
        }
    }
    //create function for get some info Customers statics

    public async Task<CustomerVM> GetByIdAsync(int id)
    {
        try
        {
            // get Customer as traking 
            var Customer = await _repositoryManager.CustomerRepository.GetByIdAsync(id);

            //check for Customer
            if (Customer == null)
                return new CustomerVM();

            // map from Customer to CustomerVM
            var CustomerVM = _mapper.Map<CustomerVM>(Customer);

            // Get orders for customer
            var orders = _repositoryManager.OrderRepository.GetOrdersForCustomerAsync(id);
            CustomerVM.Orders = orders.ToList<Order>();

            //check 
            if (CustomerVM == null)
                return new CustomerVM();

            //return
            return CustomerVM;
        }
        catch (Exception ex)
        {
            return new CustomerVM();
        }
    }

    public async Task<CustomerVM> GetByEmailAsync(string email)
    {
        try
        {
            // get Customer as traking 
            var customer = await _repositoryManager.CustomerRepository.GetCustomerByEmailAsync(email);

            //check for Customer
            if (customer == null)
                return new CustomerVM();

            // map from Customer to CustomerVM
            var CustomerVM = _mapper.Map<CustomerVM>(customer);

            // Get orders for customer
            var orders =  _repositoryManager.OrderRepository.GetOrdersForCustomerAsync(customer.Id);
            CustomerVM.Orders = orders.ToList<Order>();

            //check 
            if (CustomerVM == null)
                return new CustomerVM();

            //return
            return CustomerVM;
        }
        catch (Exception ex)
        {
            return new CustomerVM();
        }
    }

    // --------------------- Update ---------------------
    public async Task<string> UpdateAsync(int id, EditCustomerVM model)
    {
        using var transaction = _repositoryManager.CustomerRepository.BeginTransaction();
        try
        {
            var oldCustomer = await _repositoryManager.CustomerRepository.GetByIdAsync(id);
            if (oldCustomer == null)
                return "Fail";

            _mapper.Map(model, oldCustomer);

            if (model.ImageUrl != null && model.ImageUrl.Length > 0)
            {
                string path = await _fileService.SaveImageAsync(model.ImageUrl, "Images/Customer");
                oldCustomer.ImagePath = path;
            }

            await _repositoryManager.CustomerRepository.SaveChangesAsync();
            transaction.Commit();
            return "Success";
        }
        catch
        {
            transaction.Rollback();
            return "Fail";
        }
    }

    // --------------------- Delete ---------------------
    public async Task<string> DeleteAsync(int id)
    {
        try
        {
            // get Customer as traking 
            var removeCustomer = await _repositoryManager.CustomerRepository.GetByIdAsync(id);

            //check for Customer
            if (removeCustomer == null)
                return "Fail";

            //save changes
            await _repositoryManager.CustomerRepository.DeleteAsync(removeCustomer);
            _fileService.DeleteImage(removeCustomer.ImagePath);
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
