using System.ComponentModel.DataAnnotations;

namespace Perfum.Services.ViewModels.Authentication;

public record ForgotPasswordVM
{
    [Required, EmailAddress]
    public string Email { get; set; } = string.Empty;
}

public record VerifyCodeVM
{
    [Required, EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string Code { get; set; } = string.Empty;
}

public record ResetPasswordVM
{
    [Required, EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string Code { get; set; } = string.Empty;

    [Required, DataType(DataType.Password)]
    [StringLength(100, MinimumLength = 6,
        ErrorMessage = "Password must be 6 letters at least")]
    public string NewPassword { get; set; } = string.Empty;

    [DataType(DataType.Password)]
    [Compare(nameof(NewPassword), ErrorMessage = "Password didn't match")]
    public string ConfirmPassword { get; set; } = string.Empty;
}

