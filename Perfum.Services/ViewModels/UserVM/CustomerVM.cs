
using Microsoft.AspNetCore.Http;
using Perfum.Domain.Models.Orders;

namespace Perfum.Services.ViewModels.UserVM;

public record CustomerVM
{
    public int Id { get; set; }
    public string UserName { get; set; }

    public string Email { get; set; }

    public string Address { get; set; }

    public string PhoneNumber { get; set; }

    public string ImageUrl { get; set; }

    public List<Review> Reviews { get; set; } = new List<Review>();
    public List<Order> Orders { get; set; } = new List<Order>();

}

public record AddCustomerVM
{
    public string UserName { get; set; }

    public string Password { get; set; }

    public string Email { get; set; }

    public string Address { get; set; }

    public string PhoneNumber { get; set; }

    public IFormFile ImageUrl { get; set; }

    public List<Review> Reviews { get; set; } = new List<Review>();
    public List<Order> Orders { get; set; } = new List<Order>();
}

public record EditCustomerVM
{
    public string UserName { get; set; }

    public string Password { get; set; }

    public string Email { get; set; }

    public string Address { get; set; }

    public string PhoneNumber { get; set; }

    public IFormFile ImageUrl { get; set; }

    public List<Review> Reviews { get; set; } = new List<Review>();
    public List<Order> Orders { get; set; } = new List<Order>();
}
