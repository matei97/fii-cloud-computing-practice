using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Obserability.Sample.ApiService.Metrics;
using Obserability.Sample.ServiceDefaults;
using Observability.Migration;

var builder = WebApplication.CreateBuilder(args);

// Add service defaults & Aspire components.
builder.AddServiceDefaults("apiservice", builder.Configuration, ["Obserability.Sample.ApiService"]);


builder.Services.AddDbContextPool<MyDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("db1"), sqlOptions =>
    {
        sqlOptions.MigrationsAssembly("Obserability.Shared");
        // Workround for https://github.com/dotnet/aspire/issues/1023
        sqlOptions.ExecutionStrategy(c => new RetryingSqlServerRetryingExecutionStrategy(c));
    }));
builder.EnrichSqlServerDbContext<MyDbContext>(settings =>
    // Disable Aspire default retries as we're using a custom execution strategy
    settings.DisableRetry = true);
// Add services to the container.
builder.Services.AddProblemDetails();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<WeatherMetrics>();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseExceptionHandler();


app.MapGet("/weatherforecast", async (ILogger<Program> logger, MyDbContext context, WeatherMetrics weatherMetrics) =>
{
    var weatherForecasts = context.WeatherForecasts.ToList();
    weatherMetrics.ServiceCalls(1);
    logger.LogInformation("We have {0} items", weatherForecasts.Count);

    return weatherForecasts;
});

app.MapPost("/weatherforecast",
    async ([FromServices] ILogger<Program> logger, [FromServices] MyDbContext context,
        [FromServices] WeatherMetrics weatherMetrics, WeatherForecast weather) =>
    {
        if (weather.TemperatureC >= 30)
        {
            logger.LogWarning("Temperature is too high: {0}", weather.TemperatureC);

            weatherMetrics.HotForecast();
        }

        await context.AddAsync(weather);

        await context.SaveChangesAsync();

        return Results.Created();
    });
app.UseSwagger();

// if (app.Environment.IsDevelopment())
// {
app.UseSwaggerUI();
// }

app.MapDefaultEndpoints();


app.UseSimulatedLatency(app.Configuration.GetValue<int?>("MIN_LATENCY_MSEC"),
    app.Configuration.GetValue<int?>("MAX_LATENCY_MSEC"));
app.UseFailGenerator(app.Configuration.GetValue<decimal?>("FAIL_RATE"));


app.Run();