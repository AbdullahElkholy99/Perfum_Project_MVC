using System.Security.Cryptography;
using System.Text;

namespace Perfum.Services.Services.Authentication;

public static class PasswordResetService
{
    public static string GenerateNumericCode(int length = 6)
    {
        using var rnd = RandomNumberGenerator.Create();
        var bytes = new byte[length];
        rnd.GetBytes(bytes);

        var sb = new StringBuilder(length);
        foreach (var b in bytes)
        {
            sb.Append((b % 10).ToString());
        }

        return sb.ToString();
    }

    public static string HashCode(string code)
    {
        using var sha256 = SHA256.Create();
        var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(code));
        return Convert.ToBase64String(bytes);
    }
}

