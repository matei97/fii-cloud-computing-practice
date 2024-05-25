using System.Diagnostics.Metrics;

namespace Obserability.Sample.ApiService.Metrics;

public class WeatherMetrics
{
    private readonly Counter<int> _serviceCalls;
    private readonly Counter<int> _hotForecasts;

    public WeatherMetrics(IMeterFactory meterFactory)
    {
        var meter = meterFactory.Create("Obserability.Sample.ApiService");

        _serviceCalls = meter.CreateCounter<int>(name: "observability.apiService.weather.service_calls",
            unit: "{calls}",
            description: "Number of times the API service is being called to list all weather forecasts.");

        _hotForecasts = meter.CreateCounter<int>("observability.apiService.weather.hot", unit: "{celsiusDegrees}",
            description: "Weather forecasts above 30 celsius degrees");
    }

    public void ServiceCalls(int quantity)
    {
        _serviceCalls.Add(quantity);
    }

    public void HotForecast()
    {
        _hotForecasts.Add(1);
    }
}