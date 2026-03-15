using Stripe;

namespace Perfum.Services.Services.PaymentMethods;

public class StripePaymentService : IStripePaymentService
{
    readonly IRepositoryManager _repositoryManager;
    readonly IConfiguration _configuration;
    readonly IMapper _mapper;
    readonly AppDbContext _context;

    public StripePaymentService(IRepositoryManager repositoryManager, IConfiguration configuration, AppDbContext context, IMapper mapper)
    {
        _repositoryManager = repositoryManager;
        _configuration = configuration;
        _context = context;
        _mapper = mapper;
    }

    // by abdullah ali
    public async Task<PaymentIntent> CreatePaymentIntentAsync(CreateOrderPaymentVM orderDTO)
    {
        decimal total = 0;

        foreach (var item in orderDTO.BasketItems)
        {
            var product = await _repositoryManager
                .ProductRepository
                .GetByIdAsync(item.Id);

            if (product == null)
                throw new Exception("Product not found");

            total += product.Price * item.Quantity;
        }

        StripeConfiguration.ApiKey = _configuration["StripeSetting:SecretKey"];

        var service = new PaymentIntentService();

        var options = new PaymentIntentCreateOptions
        {
            Amount = (long)(total * 100), // stripe uses cents
            Currency = "egp",
            PaymentMethodTypes = new List<string> { "card" },
            Metadata = new Dictionary<string, string>
            {
                { "buyerEmail", orderDTO.BuyerEmail }
            }
        };

        var intent = await service.CreateAsync(options);
        var saveOrder = await CreateOrdersAsync(orderDTO);

        return intent;
    }
    public async Task<Order> CreateOrdersAsync(CreateOrderPaymentVM orderDTO)
    {
        if (orderDTO.BasketItems == null || !orderDTO.BasketItems.Any())
            throw new Exception("Basket is empty");

        var orderItems = new List<OrderItem>();

        foreach (var item in orderDTO.BasketItems)
        {
            Domain.Models.Product? product = await _repositoryManager
                .ProductRepository
                .GetByIdAsync(item.Id);

            if (product == null)
                throw new Exception("Product not found");

            var orderItem = new OrderItem
            {
                ProductId = product.Id,
                ProductName = product.Name,
                UnitPrice = product.Price,
                Quantity = item.Quantity
            };

            orderItems.Add(orderItem);
        }

        var deliveryMethod = await _context
            .DeliveryMethods
            .FirstOrDefaultAsync(x => x.Id == orderDTO.DeliveryMethodId);

        if (deliveryMethod == null)
            throw new Exception("Delivery method not found");

        var subTotal = orderItems.Sum(x => x.UnitPrice * x.Quantity);

        var shipAddress = _mapper.Map<ShippingAddress>(orderDTO.ShipAddress);

        var order = new Order(
            orderDTO.CustomerId,
            orderDTO.BuyerEmail,
            subTotal,
            shipAddress,
            deliveryMethod,
            orderItems
        );
        order.ShippingAddress = $"{shipAddress.City} - {shipAddress.Street} - {shipAddress.State}";

        await _context.Orders.AddAsync(order);
        await _context.SaveChangesAsync();

        return order;
    }


}
