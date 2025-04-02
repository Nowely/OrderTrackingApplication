using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.Net.Http.Headers;
using Orders.Models;

namespace Orders.Api;

/// <summary> Апи заказов </summary>
public static class OrdersApi {
	/// <summary> Мапинг апи заказов </summary>
	public static IEndpointRouteBuilder MapOrdersApiV1(this IEndpointRouteBuilder app) {
		var group = app.MapGroup("api/v1/orders")
			.WithMetadata(
				new ProducesResponseTypeMetadata(500, typeof(ProblemDetails))
			);

		group.MapGet("/{id:int}", GetById).ProducesProblem(404).ProducesValidationProblem();
		group.MapGet("/", GetList);
		group.MapPut("/status", UpdateStatus).ProducesProblem(404);
		group.MapPost("/", Create);
		group.MapDelete("/", Delete).ProducesProblem(501);

		// SSE endpoint
		group.MapGet("/status/subscription", SubscribeOnStatusUpdate);

		return app;
	}

	//TODO Validation on id <= 0
	/// <summary> Получение информации о заказе по его идентификатору </summary>
	private static async Task<Ok<OrderGet>> GetById([AsParameters] GetOrderByIdRequest request) {
		return TypedResults.Ok(await request.Service.GetByIdAsync(request.Id));
	}

	/// <summary> Получение списка запросов </summary>
	/// <exception cref="NotImplementedException"></exception>
	private static async Task<Ok<OrderItem[]>> GetList([AsParameters] GetOrderListRequest request) {
		return TypedResults.Ok(await request.Service.GetListAsync());
	}

	/// <summary> Создание нового заказа </summary>
	private static async Task<Created<OrderGet>> Create([AsParameters] CreateOrderRequest request) {
		return TypedResults.Created("", await request.Service.CreateAsync(request.Order));
	}

	/// <summary> Обновление статуса заказа </summary>
	private static async Task<Created<OrderGet>> UpdateStatus([AsParameters] UpdateOrderStatusRequest request) {
		return TypedResults.Created("", await request.Service.UpdateStatusAsync(request.OrderStatus));
	}

	/// <summary> Удаление заказа </summary>
	private static async Task<NoContent> Delete([AsParameters] DeleteOrdersRequest request) {
		await request.Service.DeleteAsync(request.Ids);
		return TypedResults.NoContent();
	}

	/// <summary> Подписка на изменение статуса заказов. Используется Server-Sent Events </summary>
	private static async Task SubscribeOnStatusUpdate([AsParameters] SubscribeOnOrderStatusRequest request) {
		request.HttpContext.Response.Headers.Append(HeaderNames.ContentType, "text/event-stream");

		var connectionId = request.Service.AddConnection(request.HttpContext.Response, request.Token);

		// Удерживаем соединение открытым
		while (!request.Token.IsCancellationRequested) await Task.Delay(1000, request.Token);

		request.Service.RemoveConnection(connectionId);
	}
}