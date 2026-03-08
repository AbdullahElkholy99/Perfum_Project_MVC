namespace Perfum.Domain.Models.Users;

public class PasswordResetCode
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public string CodeHash { get; set; } = string.Empty;

    public DateTime ExpiresAtUtc { get; set; }

    public bool Used { get; set; }

    public User User { get; set; } = null!;
}

