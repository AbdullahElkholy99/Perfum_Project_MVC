namespace Perfum.Domain.Enums;

public enum SortedBy
{
    [Display(Name = "الأحدث")]
    Newest,
    [Display(Name = "الأقدم")]
    Oldest,
    [Display(Name = "الاسم(أ - ي)")]
    Name_ASC,
    [Display(Name = "الاسم(ي - أ)")]
    Name_DESC
}
