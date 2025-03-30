var builder = DistributedApplication.CreateBuilder(args);

var postgres = builder.AddPostgres("Postgres").WithPgAdmin();
var orderDb = postgres.AddDatabase("OrderDb");

var orders = builder
	.AddProject<Projects.Orders>("Server")
	.WithReference(orderDb);

var client = builder
	.AddNpmApp("Client", "../../Client", "dev")
	.WithReference(orders)
	.WithEndpoint(3000, scheme: "https", env: "PORT")
	.ExcludeFromManifest();

builder.Build().Run();