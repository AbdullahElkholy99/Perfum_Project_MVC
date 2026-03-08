using System.ComponentModel.DataAnnotations;

namespace Perfum.Services.ViewModels.Authentication;


public record LoginVM
{
    [Required(ErrorMessage = "Email required")]
    [EmailAddress(ErrorMessage = "Email isn't Correct")]
    public string Email { get; set; }

    [Required(ErrorMessage = "PAssword is required")]
    [DataType(DataType.Password)]
    [StringLength(100, MinimumLength = 6,
        ErrorMessage = "Password must be 6 letters at least")]
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
    public string? ImagePath { get; set; }
    public List<string> Roles { get; set; }
    public bool Result { get; set; }
}
