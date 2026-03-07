
using Perfum.Domain.Models.Orders;
using Perfum.Services.IServices.Users;

namespace Perfum.Services.Services.Users;

public class CustomerService : ICustomerService
{
    #region Fields

    private readonly IRepositoryManager _repositoryManager;
    private readonly IFileService _fileService;
    private readonly IMapper _mapper;
    private readonly UserManager<User> _userManager;

    #endregion

    #region CTORs

    public CustomerService(
        IRepositoryManager repositoryManager,
        IMapper mapper,
        IFileService fileService,
        UserManager<User> userManager)
    {
        _repositoryManager = repositoryManager;
        _mapper = mapper;
        _fileService = fileService;
        _userManager = userManager;
    }

    #endregion

    #region Method Handlers

    // --------------------- Create ---------------------
    public async Task<string> AddAsync(AddCustomerVM model)
    {
        try
        {
            if (model == null)
                return "Fail";

            var customer = new Customer
            {
                UserName = model.UserName,
                Email = model.Email,
                Address = model.Address ?? string.Empty,
                PhoneNumber = model.PhoneNumber,
            };

            // save image only if provided
            if (model.ImageUrl != null && model.ImageUrl.Length > 0)
            {
                string path = await _fileService.SaveImageAsync(model.ImageUrl, "Images/Customer");
                customer.ImagePath = path;
            }

            // UserManager inserts into AspNetUsers
            var result = await _userManager.CreateAsync(customer, model.Password);

            if (!result.Succeeded)
                return string.Join(", ", result.Errors.Select(e => e.Description));

            // TPT: EF needs a row in Customers table with the same Id
            // UserManager.CreateAsync does NOT do this automatically
            // We must insert it manually via the repository
            var existsInCustomers = await _repositoryManager.CustomerRepository
                .GetTableNoTracking()
                .AnyAsync(c => c.Id == customer.Id);

            if (!existsInCustomers)
            {
                await _repositoryManager.CustomerRepository.AddAsync(customer);
            }

            // assign Customer role
            await _userManager.AddToRoleAsync(customer, "Customer");

            return "Success";
        }
        catch (Exception ex)
        {
            return $"Fail: {ex.Message}";
        }
    }

    // --------------------- Read ---------------------
    public async Task<PagedResult<CustomerVM, CustomersFilter, DashBoardCustomer>> GetAllAsync(CustomersFilter? filter)
    {
        try
        {
            // DbSet<Customer> via EF TPH — joins AspNetUsers + Customers automatically
            var customers = await _repositoryManager.CustomerRepository
                .GetTableNoTracking()
                .Include(c => c.Orders)
                .Include(c => c.Reviews)
                .ToListAsync();

            var customerVMs = _mapper.Map<List<CustomerVM>>(customers ?? new List<Customer>());

            return new PagedResult<CustomerVM, CustomersFilter, DashBoardCustomer>
            {
                Items = customerVMs,
                TotalCount = customerVMs.Count,
                Filter = filter,
                DashboardVM = new DashBoardCustomer
                {
                    CustomersCount = customerVMs.Count,
                    BestCustomersCount = customerVMs.Count(c => c.Orders?.Count >= 5),
                    NormalCustomersCount = customerVMs.Count(c => c.Orders?.Count is >= 1 and < 5),
                    LowCustomersCount = customerVMs.Count(c => c.Orders == null || c.Orders.Count == 0)
                }
            };
        }
        catch (Exception ex)
        {
            return new PagedResult<CustomerVM, CustomersFilter, DashBoardCustomer>
            {
                Items = new List<CustomerVM>(),
                TotalCount = 0,
                Filter = filter,
                DashboardVM = null
            };
        }
    }

    public async Task<CustomerVM> GetByIdAsync(int id)
    {
        try
        {
            var user = await _userManager.FindByIdAsync(id.ToString());

            if (user == null)
                return new CustomerVM();

            var customer = user as Customer;
            if (customer == null)
                return new CustomerVM();

            var customerVM = _mapper.Map<CustomerVM>(customer);

            var orders = _repositoryManager.OrderRepository.GetOrdersForCustomerAsync(id);
            customerVM.Orders = orders.ToList<Order>();

            return customerVM ?? new CustomerVM();
        }
        catch
        {
            return new CustomerVM();
        }
    }

    public async Task<CustomerVM> GetByEmailAsync(string email)
    {
        try
        {
            var customer = await _repositoryManager.CustomerRepository.GetCustomerByEmailAsync(email);

            if (customer == null)
                return new CustomerVM();

            var customerVM = _mapper.Map<CustomerVM>(customer);

            var orders = _repositoryManager.OrderRepository.GetOrdersForCustomerAsync(customer.Id);
            customerVM.Orders = orders.ToList<Order>();

            return customerVM ?? new CustomerVM();
        }
        catch
        {
            return new CustomerVM();
        }
    }

    // --------------------- Update ---------------------
    public async Task<string> UpdateAsync(int id, EditCustomerVM model)
    {
        try
        {
            var customer = await _userManager.FindByIdAsync(id.ToString()) as Customer;

            if (customer == null)
                return "Fail";

            customer.UserName = model.UserName;
            customer.Email = model.Email;
            customer.Address = model.Address;
            customer.PhoneNumber = model.PhoneNumber;

            // update image only if a new one is provided
            if (model.ImageUrl != null && model.ImageUrl.Length > 0)
            {
                string path = await _fileService.SaveImageAsync(model.ImageUrl, "Images/Customer");
                customer.ImagePath = path;
            }

            // update password only if provided
            if (!string.IsNullOrWhiteSpace(model.Password))
            {
                var token = await _userManager.GeneratePasswordResetTokenAsync(customer);
                var pwResult = await _userManager.ResetPasswordAsync(customer, token, model.Password);
                if (!pwResult.Succeeded)
                    return string.Join(", ", pwResult.Errors.Select(e => e.Description));
            }

            var result = await _userManager.UpdateAsync(customer);

            if (!result.Succeeded)
                return string.Join(", ", result.Errors.Select(e => e.Description));

            return "Success";
        }
        catch (Exception ex)
        {
            return $"Fail: {ex.Message}";
        }
    }

    // --------------------- Delete ---------------------
    public async Task<string> DeleteAsync(int id)
    {
        try
        {
            // TPT: must remove from Customers table first (FK), then AspNetUsers
            var customerRow = await _repositoryManager.CustomerRepository
                .GetTableNoTracking()
                .FirstOrDefaultAsync(c => c.Id == id);

            if (customerRow != null)
                await _repositoryManager.CustomerRepository.DeleteAsync(customerRow);

            var user = await _userManager.FindByIdAsync(id.ToString());
            if (user == null)
                return "Fail";

            _fileService.DeleteImage((user as Customer)?.ImagePath);

            var result = await _userManager.DeleteAsync(user);

            if (!result.Succeeded)
                return string.Join(", ", result.Errors.Select(e => e.Description));

            return "Success";
        }
        catch (Exception ex)
        {
            return $"Fail: {ex.Message}";
        }
    }

    #endregion
}