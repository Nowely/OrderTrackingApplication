using MassTransit;
using Orders.Api;
using Orders.Api.Services;
using Orders.Consumers;
using Orders.Database;
using Orders.Infrastructure;
using Tools.Aspire.ServiceDefaults;

var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();
builder.AddDefaultOpenApi();
builder.Services.AddProblemDetails();
builder.Services.AddExceptionHandler<ProblemDetailsFiller>();
builder.AddNpgsqlDbContext<OrderContext>("OrderDb", null,
	options => options.AddInterceptors(new CreateInterceptor(), new UpdateInterceptor()));
builder.Services.AddScoped<OrderService>();
builder.Services.AddSingleton<OrderStatusSubscriptionService>();
builder.Services.AddMassTransit(x => {
	x.AddConsumer<OrderStatusConsumer>();

	x.UsingRabbitMq((context, config) => {
		var configService = context.GetRequiredService<IConfiguration>();
		var connectionString = configService.GetConnectionString("Rabbit");
		config.ConfigureEndpoints(context);
		config.Host(connectionString);
	});
});
builder.Services.AddHostedService<ScopedBackgroundServiceHandler>();
builder.AddOpenApiSaving("assets/orders.v1.json", "swagger/v1/swagger.json");

var app = builder.Build();

app.UseExceptionHandler();
app.UseDefaultOpenApi();

app.MapOrdersApiV1();

app.MapDefaultEndpoints();

app.Run();