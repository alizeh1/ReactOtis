using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.FileProviders;
using WebApi.Model.Data;
using WebApi.Model.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IDepartmentRepository, DepartmentRepository>();
builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();

builder.Services.AddDbContext<APIDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("newConnection")));

//Enable CORS
builder.Services.AddCors(c =>
{
    c.AddPolicy("AllowOrigin", options => options.AllowAnyOrigin().AllowAnyMethod()
      .AllowAnyHeader());
});

//services.AddScoped<IDepartmentRepository, DepartmentRepository>();
//services.AddScoped<IEmployeeRepository, EmployeeRepository>();

//services.AddDbContext<APIDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("EmployeeAppCon")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
//if (app.Environment.IsProduction())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//Apps that use JavaScript to retrieve static files cross site must call UseCors before UseStaticFiles 
app.UseCors(builder => {
    builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
});
app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthorization();
app.MapControllers();
//app.UseEndpoints(endpoints => {
//    endpoints.MapControllers();
//});
//the app.UseStaticFiles() method adds StaticFiles middleware into the request pipeline. The UseStaticFiles is an extension method included in the StaticFiles middleware so that we can easily configure it.
app.UseStaticFiles();
//app.UseStaticFiles(new StaticFileOptions
//{
//    FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "Photos")),
//    RequestPath = "/Photos"
//});

//app.MapControllers();
app.MapFallbackToFile("index.html");
app.Run();


