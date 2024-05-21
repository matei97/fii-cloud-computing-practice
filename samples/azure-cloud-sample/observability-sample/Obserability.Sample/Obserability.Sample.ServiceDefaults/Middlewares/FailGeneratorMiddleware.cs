using System.Net;
using Microsoft.AspNetCore.Http;

namespace Obserability.Sample.ServiceDefaults.Middlewares
{
    public class FailGeneratorMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly decimal _failRate;

        private readonly ThreadLocal<Random> _random;

        public FailGeneratorMiddleware(
            RequestDelegate next,
            decimal failRate
        )
        {
            _next = next;
            _failRate = failRate;
            _random = new ThreadLocal<Random>(() => new Random());
        }

        public async Task Invoke(HttpContext context)
        {
            if (_random.Value != null)
            {
                var v = _random.Value.Next(100);

                if (v <= _failRate)
                {
                    context.Response.StatusCode = 503;
                    context.Response.Body = Stream.Null;
                    //throw new Exception($"Failed ({_failRate}% chance)");
                }
            }

            await _next(context);
        }
    }
}