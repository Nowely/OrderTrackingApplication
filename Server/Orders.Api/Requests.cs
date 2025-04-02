using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Orders.Api.Services;
using Orders.Models;

namespace Orders.Api;

/// <summary> Получение заказа по идентификатору </summary>
public record GetOrderByIdRequest {
	/// <summary> Идентификатор заказа </summary>
	[FromRoute]
	[Range(1, int.MaxValue, ErrorMessage = "Число должно быть больше 0.")]
	public int Id { get; set; }

	/// <summary> Сервис для работы с заказами </summary>
	[FromServices]
	public required OrderService Service { get; set; }
}

/// <summary> Получение списка заказов </summary>
public record GetOrderListRequest {
	/// <summary> Сервис для работы с заказами </summary>
	[FromServices]
	public required OrderService Service { get; set; }
}

/// <summary> Создание нового заказа </summary>
public record CreateOrderRequest {
	/// <summary> Модель добавления заказа </summary>
	[FromBody]
	[Required]
	public required OrderCreate Order { get; set; }

	/// <summary> Сервис для работы с заказами </summary>
	[FromServices]
	public required OrderService Service { get; set; }
}

/// <summary> Обновление статуса заказа </summary>
public record UpdateOrderStatusRequest {
	/// <summary> Модель обновления заказа </summary>
	[FromBody]
	[Required]
	public required OrderStatusUpdate OrderStatus { get; set; }

	/// <summary> Сервис для работы с заказами </summary>
	[FromServices]
	public required OrderService Service { get; set; }
}

/// <summary> Удаление заказов </summary>
public record DeleteOrdersRequest {
	/// <summary> Идентификаторы заказов на удаление </summary>
	[FromQuery]
	[Required]
	public required int[] Ids { get; set; }

	/// <summary> Сервис для работы с заказами </summary>
	[FromServices]
	public required OrderService Service { get; set; }
}

/// <summary> Обновление статуса заказа </summary>
public record SubscribeOnOrderStatusRequest {
	/// <summary> Контекст http запроса </summary>
	public required HttpContext HttpContext { get; set; }

	/// <summary> Токен отмены </summary>
	public CancellationToken Token { get; set; } = CancellationToken.None;

	/// <summary> Сервис для работы с заказами </summary>
	[FromServices]
	public required OrderStatusSubscriptionService Service { get; set; }
}