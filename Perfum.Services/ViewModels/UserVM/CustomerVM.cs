
using System.ComponentModel.DataAnnotations;

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
    [Required(ErrorMessage = "User name is required")]
    [StringLength(50, MinimumLength = 3, ErrorMessage = "User name must be between 3 and 50 characters")]
    public string UserName { get; set; }

    [Required(ErrorMessage = "Password is required")]
    [StringLength(100, MinimumLength = 6, ErrorMessage = "Password must be at least 6 characters")]
    [DataType(DataType.Password)]
    public string Password { get; set; }

    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Invalid email address")]
    public string Email { get; set; }

    [Required(ErrorMessage = "Address is required")]
    [StringLength(200)]
    public string Address { get; set; }

    [Required(ErrorMessage = "Phone number is required")]
    [Phone(ErrorMessage = "Invalid phone number")]
    public string PhoneNumber { get; set; }

    [Required(ErrorMessage = "Profile image is required")]
    public IFormFile ImageUrl { get; set; }

    public List<Review> Reviews { get; set; } = new List<Review>();
    public List<Order> Orders { get; set; } = new List<Order>();
}
public record EditCustomerVM
{
    [Required(ErrorMessage = "User name is required")]
    [StringLength(50, MinimumLength = 3)]
    public string UserName { get; set; }

    [Required(ErrorMessage = "Email is required")]
    [EmailAddress]
    public string Email { get; set; }

    [Required(ErrorMessage = "Address is required")]
    [StringLength(200)]
    public string Address { get; set; }

    [Required(ErrorMessage = "Phone number is required")]
    [Phone]
    public string PhoneNumber { get; set; }

    [StringLength(100, MinimumLength = 6, ErrorMessage = "Password must be at least 6 characters")]
    [DataType(DataType.Password)]
    public string Password { get; set; }

    [DataType(DataType.Password)]
    [Compare("Password", ErrorMessage = "Password and Confirm Password do not match")]
    public string ConfirmPassword { get; set; }

    public IFormFile? ImageUrl { get; set; }

    public List<Review> Reviews { get; set; } = new List<Review>();
    public List<Order> Orders { get; set; } = new List<Order>();
}