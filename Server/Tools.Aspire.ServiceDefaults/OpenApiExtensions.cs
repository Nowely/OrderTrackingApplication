using System.Reflection;
using System.Text.Json.Serialization;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace Tools.Aspire.ServiceDefaults;

/// <summary> Расширения для работы с open api </summary>
public static class OpenApiExtensions {
	/// <summary> Add open api </summary>
	public static IHostApplicationBuilder AddDefaultOpenApi(this IHostApplicationBuilder builder) {
		builder.Services.AddEndpointsApiExplorer();
		builder.Services.AddSwaggerGen(options => {
			foreach (string filePath in Directory.GetFiles(AppContext.BaseDirectory, "*.xml"))
				options.IncludeXmlComments(filePath);

			options.SchemaFilter<RequiredMemberFilter>();
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

	/// <summary>
	///     Сохраняет в файловой системе open api файл, которое генерирует приложение.
	/// </summary>
	/// <param name="builder"></param>
	/// <param name="filePath">
	///     Путь и название файла относительно корня приложения (Solution root). Например,
	///     assets/orders.v1.json
	/// </param>
	/// <param name="swaggerUrl">
	///     Путь, откуда можно скачать сгенерированную open api спецификацию относительно адреса текущего
	///     приложения. Например, swagger/v1/swagger.json
	/// </param>
	public static IHostApplicationBuilder AddOpenApiSaving(
		this IHostApplicationBuilder builder,
		string filePath,
		string swaggerUrl
	) {
		if (!builder.Environment.IsDevelopment()) return builder;

		builder.Services.AddScoped<IScopedBackgroundService>(sp => {
			var logger = sp.GetRequiredService<ILogger<SwaggerGenerationScopedBackgroundService>>();
			var client = sp.GetRequiredService<IHttpClientFactory>().CreateClient();
			//TODO SelfUrl может отсутствовать. Значени по умолчанию - не выход.
			var selfUrl = sp.GetRequiredService<IConfiguration>().GetValue<string>("SelfUrl", "")!;
			string rootPath = FindSolutionRoot();
			filePath = Path.Combine(rootPath, filePath);

			client.BaseAddress = new Uri(selfUrl);

			return new SwaggerGenerationScopedBackgroundService(logger, client, filePath, swaggerUrl);
		});

		return builder;


		static string FindSolutionRoot() {
			var directory = new DirectoryInfo(Directory.GetCurrentDirectory());

			while (directory != null && !directory.GetFiles("*.sln?").Any()) directory = directory.Parent;

			return directory?.FullName ?? throw new InvalidOperationException("Solution root not found");
		}
	}


	/// <summary>Для получения файла со сваггером </summary>
	public sealed class SwaggerGenerationScopedBackgroundService(
		ILogger<SwaggerGenerationScopedBackgroundService> logger,
		HttpClient client,
		string swaggerFilePath,
		string swaggerUrl
	) : IScopedBackgroundService {
		/// <inheritdoc />
		public async Task DoWorkAsync(CancellationToken stoppingToken) {
			await ProcessSwaggerFileAsync(client, swaggerFilePath, stoppingToken);
		}


		private async Task ProcessSwaggerFileAsync(HttpClient http, string filePath, CancellationToken stoppingToken) {
			string swaggerFile = await http.GetStringAsync(swaggerUrl, stoppingToken);
			var isEqual = true;
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

internal class RequiredMemberFilter : ISchemaFilter {
	public void Apply(OpenApiSchema schema, SchemaFilterContext context) {
		var nullabilityContext = new NullabilityInfoContext();
		var properties = context.Type.GetProperties();

		foreach (var property in properties) {
			if (property.HasAttribute<JsonIgnoreAttribute>()) continue;

			string jsonName = property.Name;
			if (property.HasAttribute<JsonPropertyNameAttribute>())
				jsonName = property.GetCustomAttribute<JsonPropertyNameAttribute>()!.Name;

			string? jsonKey = schema.Properties.Keys.SingleOrDefault(key =>
				string.Equals(key, jsonName, StringComparison.OrdinalIgnoreCase));

			if (string.IsNullOrWhiteSpace(jsonKey)) continue;

			var nullabilityInfo = nullabilityContext.Create(property);
			if (nullabilityInfo.ReadState == NullabilityState.Nullable) continue;

			schema.Required.Add(jsonKey);
		}
	}
}