using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

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

	/// <summary> Сохраняет в файловой системе open api файл, которое генерирует приложение.  </summary>
	public static IHostApplicationBuilder AddOpenApiSaving(
		this IHostApplicationBuilder builder,
		string filePath,
		string swaggerUrl
	) {
		if (!builder.Environment.IsDevelopment()) {
			return builder;
		}

		builder.Services.AddScoped<IScopedBackgroundService>(sp => {
			var logger = sp.GetRequiredService<ILogger<SwaggerGenerationScopedBackgroundService>>();
			var client = sp.GetRequiredService<IHttpClientFactory>().CreateClient();
			var selfUrl = sp.GetRequiredService<IConfiguration>().GetValue<string>("SelfUrl", "")!;
			var rootPath = FindSolutionRoot();
			filePath = Path.Combine(rootPath, filePath);

			client.BaseAddress = new Uri(selfUrl);

			return new SwaggerGenerationScopedBackgroundService(logger, client, filePath, swaggerUrl);
		});

		return builder;
	}

	private static string FindSolutionRoot() {
		var directory = new DirectoryInfo(Directory.GetCurrentDirectory());

		while (directory != null && !directory.GetFiles("*.sln?").Any()) {
			directory = directory.Parent;
		}

		return directory?.FullName
		       ?? throw new InvalidOperationException("Solution root not found");
	}

	/// <summary>Для получения файла со сваггером </summary>
	public sealed class SwaggerGenerationScopedBackgroundService(
		ILogger<SwaggerGenerationScopedBackgroundService> logger,
		HttpClient client,
		string swaggerFilePath,
		string swaggerUrl
	) : IScopedBackgroundService {
		/// <inheritdoc/>
		public async Task DoWorkAsync(CancellationToken stoppingToken) {
			await ProcessSwaggerFileAsync(client, swaggerFilePath, stoppingToken);
		}


		private async Task ProcessSwaggerFileAsync(HttpClient http, string filePath, CancellationToken stoppingToken) {
			var swaggerFile = await http.GetStringAsync(swaggerUrl, stoppingToken);
			bool isEqual = true;
			bool isExists = File.Exists(filePath);
			if (isExists) {
				string existContent = await File.ReadAllTextAsync(filePath, stoppingToken);
				isEqual = string.Equals(
					Regex.Replace(swaggerFile, @"\s", ""),
					Regex.Replace(existContent, @"\s", ""),
					StringComparison.OrdinalIgnoreCase);
			}

			if (!isEqual || !isExists)
				await File.WriteAllTextAsync(filePath, swaggerFile, stoppingToken);
		}
	}
}