namespace Perfum.Services.ViewModels.Authentication;

public record AddClaimsToRoleVM
{
    public int? Id { get; set; }
    public string Role { get; set; }
    public string ConcurrencyStamp { get; set; }
    public List<string> Permissions { get; set; } = new List<string>();
}
public class RoleWithClaimsVM
{
    public int Id { get; set; }
    public string Name { get; set; }
    public List<string> Claims { get; set; } = new();

    public int UsersCount { get; set; } = 0;
    public int PremissionsCount { get; set; } = 0;
    public int TotalPermissions { get; set; } = 0;
}