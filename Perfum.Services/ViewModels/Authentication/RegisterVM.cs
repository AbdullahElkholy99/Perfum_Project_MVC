using System.ComponentModel.DataAnnotations;

namespace Perfum.Services.ViewModels.Authentication;

public record RegisterVM
{
    [Required(ErrorMessage = "UserName is Required")]
    [StringLength(30, MinimumLength = 3,
        ErrorMessage = "UserName Must be from 3 to 30 Letters")]
    public string UserName { get; set; }

    [Required(ErrorMessage = "Email Is required")]
    [EmailAddress(ErrorMessage = "Email Pattern Isn't Correct")]
    public string Email { get; set; }

    [Required(ErrorMessage = "Password Is required")]
    [DataType(DataType.Password)]
    [StringLength(100, MinimumLength = 6,
        ErrorMessage = "Password must be 6 letters at least")]
    //[RegularExpression(@"^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$",
    //    ErrorMessage = "كلمة المرور يجب أن تحتوي على حرف كبير وصغير ورقم")]
    public string Password { get; set; }

    [Required(ErrorMessage = "Password Confirmation Required")]
    [DataType(DataType.Password)]
    [Compare(nameof(Password), ErrorMessage = "Password Must Match")]
    public string ConfirmPassword { get; set; }

    [Required(ErrorMessage = "Phone Number is required")]
    [Phone(ErrorMessage = "Pgone Number isnn't Correct")]
    public string PhoneNumber { get; set; }

    [Required(ErrorMessage = "Address is required")]
    [StringLength(200, ErrorMessage = "Address must be less than 200 letters")]
    public string Address { get; set; }

}