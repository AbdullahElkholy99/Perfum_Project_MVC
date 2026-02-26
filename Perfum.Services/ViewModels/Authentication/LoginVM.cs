using System.ComponentModel.DataAnnotations;

namespace Perfum.Services.ViewModels.Authentication;

public record LoginVM
{
    [EmailAddress]
    public string Email { get; set; }

    [DataType(DataType.Password)]
    public string Password { get; set; }

    public bool RememberMe { get; set; }
}
public record LoginResultVM
{
    public bool Result { get; set; }
    public List<string> Roles { get; set; }
}
