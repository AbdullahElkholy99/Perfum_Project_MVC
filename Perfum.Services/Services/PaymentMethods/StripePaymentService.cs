using Perfum.Services.ViewModels.PaymentMethodsVM;
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

    public async Task<CustomerBasketVM> CreateOrUpdatePaymentAsync(string basketId, int? delivertMethodId)
    {
        CustomerBasket basket = await _repositoryManager
            .CustomerBasketRepositry
            .GetBasketAsync(basketId);

        StripeConfiguration.ApiKey = _configuration["StripSetting:SecretKey"];

        decimal shippingPrice = 0m;

        if (delivertMethodId.HasValue)
        {
            var delivery =
                await _context
                .DeliveryMethods
                .AsNoTracking()
                .FirstOrDefaultAsync(m => m.Id == delivertMethodId.Value);

            shippingPrice = delivery.Price;
        }

        //to check for price in database
        foreach (BasketItem item in basket.basketItems)
        {
            var product =
                await _repositoryManager
                .ProductRepository
                .GetByIdAsync(item.Id);

            item.Price = product.Price;
        }

        PaymentIntentService paymentIntentService = new();
        PaymentIntent _intent;

        if (string.IsNullOrEmpty(basket.PaymentIntentId))
        {
            var option = new PaymentIntentCreateOptions
            {
                Amount = (long)basket.basketItems.Sum(m => m.Quantity * (m.Price * 100)) + (long)(shippingPrice * 100),

                Currency = "USD",
                PaymentMethodTypes = new List<string> { "card", "paymob", "paypal" }
            };
            _intent = await paymentIntentService.CreateAsync(option);
            basket.PaymentIntentId = _intent.Id;
            basket.ClientSecret = _intent.ClientSecret;
        }
        else
        {
            var option = new PaymentIntentUpdateOptions
            {
                Amount = (long)basket.basketItems.Sum(m => m.Quantity * (m.Price * 100)) + (long)(shippingPrice * 100),
            };
            await paymentIntentService.UpdateAsync(basket.PaymentIntentId, option);
        }
        await _repositoryManager.CustomerBasketRepositry.UpdateBasketAsync(basket);


        return _mapper.Map<CustomerBasketVM>(basket);
    }
    public async Task<Order> CreateOrUpdatePaymentOrderAsync(int orderId)
    {
        var order = await _repositoryManager
            .OrderRepository
            .GetByIdAsync(orderId);

        if (order == null)
            throw new Exception("Order Not Found");

        var total = order.GetTotal();

        StripeConfiguration.ApiKey = _configuration["StripeSetting:SecretKey"];

        var service = new PaymentIntentService();
        PaymentIntent intent;

        if (string.IsNullOrEmpty(order.PaymentIntentId))
        {
            var options = new PaymentIntentCreateOptions
            {
                Amount = (long)(total * 100),
                Currency = "egp",
                PaymentMethodTypes = new List<string> { "card" }
            };

            intent = await service.CreateAsync(options);

            order.PaymentIntentId = intent.Id;
            order.ClientSecret = intent.ClientSecret;
        }
        else
        {
            var options = new PaymentIntentUpdateOptions
            {
                Amount = (long)(total * 100)
            };

            await service.UpdateAsync(order.PaymentIntentId, options);
        }

        await _repositoryManager.OrderRepository.UpdateAsync(order);

        return order;
    }
    // by abdullah ali
    public async Task<Order> CreateOrdersAsync(CreateOrderPaymentVM orderDTO, string buyerEmail)
    {
        var basket = await _repositoryManager
            .CustomerBasketRepositry
            .GetBasketAsync(orderDTO.BasketId);

        if (basket == null)
            throw new Exception("Basket not found");

        var orderItems = new List<OrderItem>();

        foreach (var item in basket.basketItems)
        {
            var product = await _repositoryManager
                .ProductRepository
                .GetByIdAsync(item.Id);

            if (product == null)
                throw new Exception("Product not found");

            var orderItem = new OrderItem
            {
                ProductId = product.Id,
                ProductName = product.Name,
                UnitPrice = (decimal)item.Price,
                Quantity = item.Quantity
            };

            orderItems.Add(orderItem);
        }

        var deliveryMethod =
            await _context
            .DeliveryMethods
            .FirstOrDefaultAsync(x => x.Id == orderDTO.DeliveryMethodId);

        if (deliveryMethod == null)
            throw new Exception("Delivery method not found");

        var subTotal = orderItems.Sum(x => x.UnitPrice * x.Quantity);

        var shipAddress = _mapper.Map<ShippingAddress>(orderDTO.ShipAddress);

        var existOrder = await _context.Orders
            .FirstOrDefaultAsync(x => x.PaymentIntentId == basket.PaymentIntentId);

        if (existOrder != null)
        {
            _context.Orders.Remove(existOrder);

            await CreateOrUpdatePaymentAsync(
                basket.PaymentIntentId,
                deliveryMethod.Id
            );
        }

        var order = new Order(
            1,
            buyerEmail,
            subTotal,
            shipAddress,
            deliveryMethod,
            orderItems,
            basket.PaymentIntentId
        );

        await _context.Orders.AddAsync(order);
        await _context.SaveChangesAsync();

        await _repositoryManager
            .CustomerBasketRepositry
            .DeleteBasketAsync(orderDTO.BasketId);

        return order;
    }

    public async Task<PaymentIntent> CreatePaymentIntentAsync(CreateOrderPaymentVM orderDTO)
    {


        var basket = await _repositoryManager
            .CustomerBasketRepositry
            .GetBasketAsync(orderDTO.BasketId);

        if (basket == null)
            throw new Exception("Basket not found");

        double total = 0;

        foreach (var item in basket.basketItems)
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
        PaymentIntent intent;

        if (string.IsNullOrEmpty(basket.PaymentIntentId))
        {
            var options = new PaymentIntentCreateOptions
            {
                Amount = (long)(total * 100),
                //Amount = (long)(0.5),
                Currency = "egp",
                PaymentMethodTypes = new List<string> { "card" }
            };

            intent = await service.CreateAsync(options);

            basket.PaymentIntentId = intent.Id;
            basket.ClientSecret = intent.ClientSecret;

            await _repositoryManager.CustomerBasketRepositry.UpdateBasketAsync(basket);
        }
        else
        {
            var options = new PaymentIntentUpdateOptions
            {
                Amount = (long)(total * 100)
            };

            intent = await service.UpdateAsync(basket.PaymentIntentId, options);

        }


        var saveOrder = await CreateOrdersAsync(orderDTO, orderDTO.BuyerEmail);

        if (saveOrder is null)
            throw new Exception("can not save order");

        return intent;
    }


    public async Task<Order> UpdateOrderFaild(string PaymentInten)
    {
        var order = await _context.Orders.FirstOrDefaultAsync(m => m.PaymentIntentId == PaymentInten);
        if (order is null)
        {
            return null;
        }
        order.Status = Status.PaymentFaild;
        _context.Orders.Update(order);
        await _context.SaveChangesAsync();
        return order;

    }

    public async Task<Order> UpdateOrderSuccess(string PaymentInten)
    {
        var order = await _context.Orders.FirstOrDefaultAsync(m => m.PaymentIntentId == PaymentInten);
        if (order is null)
        {
            return null;
        }
        order.Status = Status.PaymentReceived;
        _context.Orders.Update(order);
        await _context.SaveChangesAsync();
        return order;
    }


}
