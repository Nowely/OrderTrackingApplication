using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Tools.Aspire.ServiceDefaults;

/// <summary> Бэкграунд сервис для выпонения <see cref="DoWorkAsync"/> </summary>
public sealed class ScopedBackgroundServiceHandler(
	IServiceScopeFactory serviceScopeFactory,
	ILogger<ScopedBackgroundServiceHandler> logger
) : BackgroundService {
	private const string _className = nameof(ScopedBackgroundServiceHandler);

	/// <inheritdoc/>
	protected override async Task ExecuteAsync(CancellationToken stoppingToken) {
		logger.LogInformation("{Name} is running", _className);
		await DoWorkAsync(stoppingToken);
	}

	private async Task DoWorkAsync(CancellationToken stoppingToken) {
		logger.LogInformation("{Name} is working", _className);

		using var scope = serviceScopeFactory.CreateScope();
		var services = scope.ServiceProvider.GetServices<IScopedBackgroundService>();

		var tasks = services.Select(service => service.DoWorkAsync(stoppingToken)).ToArray();
		await Task.WhenAll(tasks);
	}

	/// <inheritdoc/>
	public override async Task StopAsync(CancellationToken stoppingToken) {
		logger.LogInformation("{Name} is stopping", _className);
		await base.StopAsync(stoppingToken);
	}
}
