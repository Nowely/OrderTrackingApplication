using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Tools.Aspire.ServiceDefaults;

/// <summary> Расширения для работы с open api </summary>
public static class OpenApiExtensions {
	/// <summary> Add open api </summary>
	public static IHostApplicationBuilder AddDefaultOpenApi(this IHostApplicationBuilder builder) {
		builder.Services.AddEndpointsApiExplorer();
		builder.Services.AddSwaggerGen(options => {
			foreach (string filePath in Directory.GetFiles(AppContext.BaseDirectory, "*.xml")) {
				options.IncludeXmlComments(filePath);
			}

		});

		return builder;
	}

	/// <summary> Use swagger and swagger ui </summary>
	public static IApplicationBuilder UseDefaultOpenApi(this WebApplication app) {
		if (!app.Environment.IsDevelopment()) return app;

		app.UseSwagger();
		app.UseSwaggerUI();

		return app;
	}
}