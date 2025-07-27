using API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Register AppDbContext using SQLite as the database provider.
// The connection string is read from appsettings.json (key: "DefaultConnection").
builder.Services.AddDbContext<AppDbContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
// Register CORS services, so we can configure CORS policies later
builder.Services.AddCors();

var app = builder.Build();

// Add the CORS middleware to allow requests from specific origins (React dev server)
app.UseCors(x => x
    .AllowAnyHeader()
    .AllowAnyMethod()
    .WithOrigins("http://localhost:5173", "https://localhost:5173"));

// Map controller endpoints (e.g., [Route("api/[controller]")])
app.MapControllers();

app.Run();
