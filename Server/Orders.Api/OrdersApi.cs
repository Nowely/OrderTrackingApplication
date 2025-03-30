using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

namespace Orders.Api;

/// <summary> Апи заказов </summary>
public static class OrdersApi {
	/// <summary> Мапинг апи заказов </summary>
	public static IEndpointRouteBuilder MapOrdersApiV1(this IEndpointRouteBuilder app) {
		var group = app.MapGroup("api/v1/orders")
			.WithMetadata(
				new ProducesResponseTypeMetadata(500, typeof(ProblemDetails))
			);

		group.MapGet("/501", Get501);
		/*
		group.MapGet("/500", Get500);
		group.MapGet("/400/validation", GetValidation400);
		group.MapGet("/404", Get404);

		group.MapGet("/{id:guid}", GetById);
		group.MapGet("/", GetList);
		group.MapPut("/", Update).ProducesProblem(405);
		group.MapPost("/", Create);
		group.MapDelete("/", Delete);*/

		return app;
	}

	private static async Task<Ok> Get501() => throw new NotImplementedException("Method not implemented!");
	/*
	private static async Task<Ok> Get500() => throw new Exception("Internal Server Error!");

	[ProducesResponseType<ValidationProblemDetails>(StatusCodes.Status400BadRequest)]
	private static async Task<Ok> GetValidation400() =>
		throw new ValidationException("Validation failed!", new() { ["Field"] = ["Error1", "Error2"] });

	private static async Task<Ok> Get404() => throw new NotFoundException("Not found!");


	[ProducesResponseType(StatusCodes.Status400BadRequest)]
	private static async Task<Ok> GetById([AsParameters] GetByIdRequest request) =>
		throw new NotImplementedException();

	private static async Task<Ok> GetList([AsParameters] GetAllPostRequest request) {
		throw new NotImplementedException();
	}

	private static async Task<Created> Create([AsParameters] CreateRequest request) {
		throw new NotImplementedException();
	}

	private static async Task<Created> Update([AsParameters] UpdateRequest request) {
		throw new NotImplementedException();
	}

	private static async Task<NoContent> Delete([AsParameters] DeleteRequest request) {
		throw new NotImplementedException();
	}*/
}