using System.Collections.Concurrent;
using System.Text.Json;
using Microsoft.AspNetCore.Http;

namespace Orders.Api.Services;

/// <summary> Сервис для управления подключениями на отслеживание изменения статуса заказа </summary>
public class OrderStatusSubscriptionService {
	private readonly ConcurrentDictionary<Guid, (HttpResponse Response, CancellationToken Cts)> _connections = new();

	/// <summary> Добавить соединение </summary>
	public Guid AddConnection(HttpResponse response, CancellationToken ct) {
		var id = Guid.NewGuid();
		_connections.TryAdd(id, (response, ct));
		return id;
	}

	/// <summary> Удалить соединение </summary>
	public void RemoveConnection(Guid id) => _connections.TryRemove(id, out _);

	/// <summary> Отправка сообщения всем клиентам, с которыми поддерживается соединение </summary>
	public async Task BroadcastAsync(OrderStatusMessage message) {
		foreach (var (response, ct) in _connections.Values) {
			var sseData = $"data: {JsonSerializer.Serialize(message)}\n\n";
			await response.WriteAsync(sseData, ct);
			await response.Body.FlushAsync(ct);
		}
	}
}