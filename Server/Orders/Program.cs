using Orders.Api;
using Orders.Database;
using Orders.Infrastructure;
using Tools.Aspire.ServiceDefaults;

var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();
builder.AddDefaultOpenApi();
builder.Services.AddProblemDetails();
builder.Services.AddExceptionHandler<ProblemDetailsFiller>();
builder.AddNpgsqlDbContext<OrderContext>("OrderDb");

var app = builder.Build();

app.UseExceptionHandler();
app.UseDefaultOpenApi();

app.MapOrdersApiV1();

app.MapDefaultEndpoints();

app.Run();

