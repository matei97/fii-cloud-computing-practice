using System.Text;
using System.Text.Json;

namespace Obserability.Sample.Web;

public class WeatherApiClient(HttpClient httpClient)
{
    public async Task<WeatherForecast[]> GetWeatherAsync(int maxItems = 50,
        CancellationToken cancellationToken = default)
    {
        List<WeatherForecast>? forecasts = null;

        await foreach (var forecast in httpClient.GetFromJsonAsAsyncEnumerable<WeatherForecast>("/weatherforecast",
                           cancellationToken))
        {
            if (forecasts?.Count >= maxItems)
            {
                break;
            }

            if (forecast is not null)
            {
                forecasts ??= [];
                forecasts.Add(forecast);
            }
        }

        return forecasts?.ToArray() ?? [];
    }


    public async Task CreateWeather(WeatherForecast forecast, CancellationToken cancellationToken = default)
    {
        var json = JsonSerializer.Serialize(forecast);
        var content = new StringContent(json, Encoding.UTF8, "application/json");

        await httpClient.PostAsync("/weatherforecast", content, cancellationToken);
    }
}

public record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}