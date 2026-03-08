using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Options;
using Perfum.MVC.Models;

namespace Perfum.MVC.Services;

public class SmtpEmailSender : IEmailSender
{
    private readonly EmailSettings _settings;

    public SmtpEmailSender(IOptions<EmailSettings> options)
    {
        _settings = options.Value;
    }

    public async Task SendEmailAsync(string email, string subject, string htmlMessage)
    {
        var host = _settings.Host?.Trim() ?? string.Empty;
        var userName = _settings.UserName?.Trim() ?? string.Empty;
        var password = _settings.Password?.Trim() ?? string.Empty;

        if (string.IsNullOrEmpty(host) || string.IsNullOrEmpty(userName) || string.IsNullOrEmpty(password))
        {
            throw new InvalidOperationException("SMTP Host, UserName, and Password must be configured in appsettings.json under Smtp.");
        }

        using var client = new SmtpClient(host)
        {
            Port = _settings.Port > 0 ? _settings.Port : 587,
            EnableSsl = _settings.EnableSsl,
            DeliveryMethod = SmtpDeliveryMethod.Network,
            UseDefaultCredentials = false,
            Credentials = new NetworkCredential(userName, password)
        };

        using var mail = new MailMessage
        {
            From = new MailAddress(userName),
            Subject = subject,
            Body = htmlMessage,
            IsBodyHtml = true
        };

        mail.To.Add(email);

        await client.SendMailAsync(mail);
    }
}

