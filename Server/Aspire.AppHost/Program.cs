var builder = DistributedApplication.CreateBuilder(args);

var postgres = builder.AddPostgres("Postgres").WithPgAdmin();
var orderDb = postgres.AddDatabase("OrderDb");

var rabbitmq = builder.AddRabbitMQ("rabbitmq").WithManagementPlugin();

var orders = builder
	.AddProject<Projects.Orders>("Server")
	.WithReference(orderDb)
	.WithReference(rabbitmq)
	.WaitFor(rabbitmq);

var client = builder
	.AddNpmApp("Client", "../../Client", "dev")
	.WithReference(orders)
	.WithEndpoint(3000, scheme: "https", env: "PORT")
	.ExcludeFromManifest();

builder.Build().Run();