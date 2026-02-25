namespace Perfum.Services.ViewModels.CategoryVM;

public record CategoryVM
{
    public int Id { get; init; }
    public string Name { get; init; }
    public string Description { get; init; }
}

public record AddCategoryVM
{
    public string Name { get; init; }
    public string Description { get; init; }
}

public record EditCategoryVM
{
    public string Name { get; init; }
    public string Description { get; init; }
}
