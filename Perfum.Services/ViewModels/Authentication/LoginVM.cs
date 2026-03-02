using System.ComponentModel.DataAnnotations;

namespace Perfum.Services.ViewModels.Authentication;


public record LoginVM
{
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
    public bool RememberMe { get; set; }
}

public record LoginResultVM
{
    public int Id { get; set; }
    public string UserName { get; set; }
    public string Email { get; set; }
    public List<string> Roles { get; set; }
    public bool Result { get; set; }
}
