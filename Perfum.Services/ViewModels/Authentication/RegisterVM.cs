using System.ComponentModel.DataAnnotations;

namespace Perfum.Services.ViewModels.Authentication;

public record RegisterVM
{
    [Required(ErrorMessage = "اسم المستخدم مطلوب")]
    [StringLength(30, MinimumLength = 3,
        ErrorMessage = "اسم المستخدم يجب أن يكون بين 3 و 30 حرف")]
    public string UserName { get; set; }

    [Required(ErrorMessage = "البريد الإلكتروني مطلوب")]
    [EmailAddress(ErrorMessage = "صيغة البريد الإلكتروني غير صحيحة")]
    public string Email { get; set; }

    [Required(ErrorMessage = "كلمة المرور مطلوبة")]
    [DataType(DataType.Password)]
    [StringLength(100, MinimumLength = 6,
        ErrorMessage = "كلمة المرور يجب أن تكون على الأقل 6 أحرف")]
    //[RegularExpression(@"^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$",
    //    ErrorMessage = "كلمة المرور يجب أن تحتوي على حرف كبير وصغير ورقم")]
    public string Password { get; set; }

    [Required(ErrorMessage = "تأكيد كلمة المرور مطلوب")]
    [DataType(DataType.Password)]
    [Compare(nameof(Password), ErrorMessage = "يجب مطابقة كلمة المرور")]
    public string ConfirmPassword { get; set; }

    [Required(ErrorMessage = "رقم الهاتف مطلوب")]
    [Phone(ErrorMessage = "رقم الهاتف غير صحيح")]
    public string PhoneNumber { get; set; }

    [Required(ErrorMessage = "العنوان مطلوب")]
    [StringLength(200, ErrorMessage = "العنوان لا يجب أن يتجاوز 200 حرف")]
    public string Address { get; set; }

}