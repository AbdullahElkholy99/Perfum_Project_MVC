

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews(context =>
{
    context.Filters.Add<HandleErrorAttribute>(int.MinValue);
});


// Register Services And Repositories
builder.Services
    .AddRepositoryDependencies(builder.Configuration)
    .AddServiceDependencies(builder.Configuration);

//Auto Mapper 
builder.Services.AddAutoMapper(typeof(Program).Assembly);

#region Authentication

builder.Services.AddAuthentication();

builder.Services.IdentityService();
builder.Services.PolicyService();

#endregion



var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
}
app.UseHttpsRedirection();

app.UseRouting();


app.UseAuthentication();
app.UseAuthorization();

app.MapStaticAssets();

app.MapControllerRoute(
    name: "default",
    //pattern: "{controller=Account}/{action=Register}/{id?}")
    pattern: "{controller=Home}/{action=Index}/{id?}")
    .WithStaticAssets();

app.Run();
