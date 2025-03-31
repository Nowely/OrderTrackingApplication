using System.Text.Json.Serialization;

namespace Orders.Models;

/// <summary> Статус заказа </summary>
[JsonConverter(typeof(JsonStringEnumConverter))]
public enum OrderStatus {
	/// <summary> Создан </summary>
	Created,
	/// <summary> Отправлен </summary>
	Shipped,
	/// <summary> Доставлен </summary>
	Delivered,
	/// <summary> Отменен </summary>
	Cancelled,
}