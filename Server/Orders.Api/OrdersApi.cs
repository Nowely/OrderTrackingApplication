using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
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

		return app;
	}


	//TODO Validation on id > 0
	/// <summary> Получение информации о заказе по его идентификатору </summary>
	private static async Task<Ok<OrderGet>> GetById([AsParameters] GetOrderByIdRequest request) =>
		TypedResults.Ok(await request.Service.GetByIdAsync(request.Id));

	/// <summary> Получение списка запросов </summary>
	/// <exception cref="NotImplementedException"></exception>
	private static async Task<Ok<OrderItem[]>> GetList([AsParameters] GetOrderListRequest request) =>
		TypedResults.Ok(await request.Service.GetListAsync());

	/// <summary> Создание нового заказа </summary>
	private static async Task<Created<OrderGet>> Create([AsParameters] CreateOrderRequest request) {
		return TypedResults.Created("", await request.Service.CreateAsync(request.Order));
	}

	/// <summary> Обновление статуса заказа </summary>
	private static async Task<Created<OrderGet>> UpdateStatus([AsParameters] UpdateOrderStatusRequest request) =>
		TypedResults.Created("", await request.Service.UpdateStatusAsync(request.OrderStatus));

	/// <summary> Удаление заказа </summary>
	private static async Task<NoContent> Delete([AsParameters] DeleteOrdersRequest request) {
		await request.Service.DeleteAsync(request.Ids);
		return TypedResults.NoContent();
	}
}