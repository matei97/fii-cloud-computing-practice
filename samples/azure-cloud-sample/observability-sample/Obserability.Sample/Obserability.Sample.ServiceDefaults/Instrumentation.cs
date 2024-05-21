using OpenTelemetry.Trace;

namespace AspireWithNode.ServiceDefaults;

public class Instrumentation
{
    public static readonly string ActivitySourceName = "Obserability.Activity";
}

public static class InstrumentationExtensions
{
    public static TracerProviderBuilder AddWorkerInstrumentation(this TracerProviderBuilder tracerProviderBuilder)
    {
        return tracerProviderBuilder.AddSource(Instrumentation.ActivitySourceName);
    }
}
