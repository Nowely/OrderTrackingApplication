var builder = DistributedApplication.CreateBuilder(args);

var postgres = builder.AddPostgres("Postgres").WithPgAdmin();
var orderDb = postgres.AddDatabase("OrderDb");

var rabbitmq = builder.AddRabbitMQ("Rabbit").WithManagementPlugin();

var orders = builder
	.AddProject<Projects.Orders>("Server")
	.WithReference(orderDb)
	.WithReference(rabbitmq)
	.WaitFor(rabbitmq);

orders.WithEnvironment("SelfUrl", orders.GetEndpoint("http"));

var client = builder
	.AddNpmApp("Client", "../../Client", "dev")
	.WithReference(orders)
	.WithEndpoint(3000, scheme: "http", env: "PORT")
	.WithEnvironment("VITE_SERVER_URL", orders.GetEndpoint("http"))
	.ExcludeFromManifest();

builder.Build().Run();