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

builder.Services
    .AddAuthentication()
    .AddGoogle("Google", options =>
    {
        var googleAuthSection = builder.Configuration.GetSection("Authentication:Google");
        options.ClientId = googleAuthSection["ClientId"]!;
        options.ClientSecret = googleAuthSection["ClientSecret"]!;
        options.Scope.Add("profile");
    });

builder.Services.IdentityService();
builder.Services.PolicyService();

#endregion

// Email sending
builder.Services.Configure<EmailSettings>(builder.Configuration.GetSection("Smtp"));
builder.Services.AddTransient<IEmailSender, SmtpEmailSender>();

// by abdullah ali
//builder.Services.AddSingleton<IConnectionMultiplexer>(sp =>
//{
//    var configuration = builder.Configuration.GetConnectionString("Redis");

//    return ConnectionMultiplexer.Connect(configuration);
//});

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
    pattern: "{controller=Account}/{action=Login}/{id?}")
    //pattern: "{controller=Home}/{action=Index}/{id?}")
    .WithStaticAssets();

app.Run();

/*
Stripe Card :
4242 4242 4242 4242
12 / 34
6124120

--------------
Login Admin: 

 */