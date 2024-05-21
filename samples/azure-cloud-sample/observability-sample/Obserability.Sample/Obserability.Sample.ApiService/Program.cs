using Microsoft.EntityFrameworkCore;
using Obserability.Sample.ServiceDefaults;
using Observability.Migration;

var builder = WebApplication.CreateBuilder(args);

// Add service defaults & Aspire components.
builder.AddServiceDefaults("apiservice", builder.Configuration);


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

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseExceptionHandler();


app.MapGet("/weatherforecast", async (ILogger<Program> logger, MyDbContext context) =>
{
    var weatherForecasts = context.WeatherForecasts.ToList();

    logger.LogInformation("We have {0} items", weatherForecasts.Count);

    return weatherForecasts;
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