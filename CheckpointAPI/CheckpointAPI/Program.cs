using Microsoft.EntityFrameworkCore;
using CheckpointAPI.DataAccess.Context;

var builder = WebApplication.CreateBuilder(args);

// ==================== SERVİS KAYITLARI ====================

// Controller'ları ekle
builder.Services.AddControllers();

// Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "Checkpoint API",
        Version = "v1",
        Description = "Checkpoint Oyun Kütüphanesi Mobil Uygulaması Backend API"
    });
});

// MSSQL Veritabanı Bağlantısı (Entity Framework Core)
builder.Services.AddDbContext<CheckpointDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// CORS - React Native'den gelen isteklere izin ver
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// TODO: Business ve DataAccess servisleri burada DI'a kaydedilecek
// builder.Services.AddScoped<IGameService, GameService>();
// builder.Services.AddScoped<IReviewService, ReviewService>();
// builder.Services.AddScoped<ILibraryService, LibraryService>();
// builder.Services.AddScoped<IUserService, UserService>();

var app = builder.Build();

// ==================== MIDDLEWARE PIPELINE ====================

// Geliştirme ortamında Swagger arayüzünü göster
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Checkpoint API v1");
        c.RoutePrefix = string.Empty; // Swagger ana sayfada açılsın
    });
}

app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseAuthorization();
app.MapControllers();

app.Run();
