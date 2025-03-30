var builder = DistributedApplication.CreateBuilder(args);

var orders = builder
	.AddProject<Projects.Orders>("Server");

var client = builder
	.AddNpmApp("Client", "../../Client", "dev")
	.WithReference(orders)
	.WithEndpoint(3000, scheme: "https", env: "PORT")
	.ExcludeFromManifest();

builder.Build().Run();