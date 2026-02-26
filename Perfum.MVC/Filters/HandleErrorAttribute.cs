using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Perfum.MVC.Filters;

public class HandleErrorAttribute : Attribute, IExceptionFilter
{
    public void OnException(ExceptionContext context)
    {
        ViewContext view = new ViewContext();
        view.ViewData["ErrorMessage"] = context.Exception.Message;
        context.Result = new ViewResult
        {
            ViewName = "Error",
            ViewData = view.ViewData
        };
        context.ExceptionHandled = true;
    }
}
