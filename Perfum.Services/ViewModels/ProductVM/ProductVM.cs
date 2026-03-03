using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Rendering;
namespace Perfum.Services.ViewModels.ProductVM;

public record ProductVM
{
    public int Id { get; set; }
    public string Name { get; set; }

    public string Descreption { get; set; }

    public double Price { get; set; }
    public double Size_Ml { get; set; }

    public string ImageUrl { get; set; }
    public string Concentration { get; set; }

    public int Stock { get; set; }
    public int CategoryId { get; set; }
}

public record AddProductVM
{
    public string Name { get; set; }

    public string Descreption { get; set; }

    public double Price { get; set; }
    public double Size_Ml { get; set; }

    public IFormFile ImageUrl { get; set; }
    public string Concentration { get; set; }

    public int Stock { get; set; }
    public int CategoryId { get; set; }
}

public record EditProductVM
{
    public string Name { get; set; }

    public string Descreption { get; set; }

    public double Price { get; set; }
    public double Size_Ml { get; set; }

    public IFormFile? ImageUrl { get; set; }
    public string Concentration { get; set; }

    public int Stock { get; set; }
    public int CategoryId { get; set; }
}



