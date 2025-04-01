namespace Tools.Aspire.ServiceDefaults;

/// <summary> Позволяет использовать любое DI </summary>
public interface IScopedBackgroundService {
	/// <summary> Запуск сервисов </summary>
	Task DoWorkAsync(CancellationToken stoppingToken);
}
