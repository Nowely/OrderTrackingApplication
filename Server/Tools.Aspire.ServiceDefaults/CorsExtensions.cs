using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Tools.Aspire.ServiceDefaults;

/*
Related docs:
	https://learn.microsoft.com/en-us/aspnet/core/security/cors?view=aspnetcore-8.0#usecors-and-usestaticfiles-order
	https://learn.microsoft.com/en-us/dotnet/aspire/fundamentals/service-defaults

*/
/// <summary>Расширения на билдер для cors </summary>
public static class CorsExtensions {
	private const string AllowAllCorsPolicyName = "AllowAll";

	/// <summary>Разрешить cors </summary>
	public static IHostApplicationBuilder AddAllowAllCors(this IHostApplicationBuilder builder) {
		builder.Services.AddCors(options => {
			options.AddPolicy(AllowAllCorsPolicyName,
				policy => {
					policy.AllowAnyHeader();
					policy.AllowAnyMethod();
					policy.AllowAnyOrigin();
				});
		});

		return builder;
	}

	/// <summary> Must be used after routing and before Authentication </summary>
	public static IApplicationBuilder UseAllowAllCors(this IApplicationBuilder app) {
		app.UseCors(AllowAllCorsPolicyName);
		return app;
	}
}