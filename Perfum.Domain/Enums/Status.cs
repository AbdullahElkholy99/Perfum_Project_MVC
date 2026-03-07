namespace Perfum.Domain.Enums;

public enum Status
{
    [Display(Name = "نشط")]
    Active,
    [Display(Name = "غير نشط")]
    Inactive,
    [Display(Name = "معلق")]
    Pending,
    [Display(Name = "منتهي")]
    Expired,
    PaymentReceived,
    PaymentFaild

}
