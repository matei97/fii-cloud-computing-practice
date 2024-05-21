using Aspire.Hosting;

var builder = DistributedApplication.CreateBuilder(args);

var cache = builder.AddRedis("cache").WithRedisCommander().WithExternalHttpEndpoints();

var db1 = builder.AddSqlServer("sql1").AddDatabase("db1");

var apiService = builder.AddProject<Projects.Obserability_Sample_ApiService>("apiservice")
    .WithReference(db1)
    .WithExternalHttpEndpoints()
    .WithEnvironment("APPLICATIONINSIGHTS_CONNECTION_STRING",
        builder.Configuration["APPLICATIONINSIGHTS_CONNECTION_STRING"]);

builder.AddProject<Projects.Observability_Migration>("migration")
    .WithReference(db1).WithEnvironment("APPLICATIONINSIGHTS_CONNECTION_STRING",
        builder.Configuration["APPLICATIONINSIGHTS_CONNECTION_STRING"]);
;

builder.AddProject<Projects.Obserability_Sample_Web>("webfrontend")
    .WithExternalHttpEndpoints()
    .WithReference(cache)
    .WithReference(apiService).WithEnvironment("APPLICATIONINSIGHTS_CONNECTION_STRING",
        builder.Configuration["APPLICATIONINSIGHTS_CONNECTION_STRING"]);
;

builder.Build().Run();