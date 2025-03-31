using MassTransit;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Orders.Database;
using Orders.Models;
using Tools.Infrastructure;

namespace Orders.Api.Services;

/// <summary> Сервис для работы с заказами </summary>
public class OrderService(ILogger<OrderService> logger, OrderContext context, IPublishEndpoint publisher) {
	/// <summary> Получение заказа по идентификатору </summary>
	/// <exception cref="NotFoundException">If no entity is found</exception>
	public async Task<OrderGet> GetByIdAsync(int id) {
		var order = await context.Orders.ProjectToGet().FirstOrDefaultAsync(o => o.Id == id);
		if (order == null) {
			throw new NotFoundException($"Order with id {id} was not found");
		}
		return order;
	}

	/// <summary> Получение списка заказов </summary>
	public async Task<OrderItem[]> GetListAsync() => await context.Orders.ProjectToItem().ToArrayAsync();

	/// <summary> Создания заказа </summary>
	public async Task<OrderGet> CreateAsync(OrderCreate newOrder) {
		var order = newOrder.ToEntity();
		context.Orders.Add(order);
		await context.SaveChangesAsync();
		return order.ToGet();
	}

	/// <summary> Обновления статуса заказа </summary>
	public async Task<OrderGet> UpdateStatusAsync(OrderStatusUpdate newOrderStatus) {
		var order = await context.Orders.FirstOrDefaultAsync(o => o.Id == newOrderStatus.Id);
		if (order == null) {
			throw new NotFoundException($"Order with id {newOrderStatus.Id} was not found");
		}
		order.Status = newOrderStatus.Status;
		context.Orders.Update(order);
		await context.SaveChangesAsync();

		await publisher.Publish(new OrderStatusMessage {
			Id = order.Id,
			Status = order.Status
		});

		return order.ToGet();
	}

	/// <summary> Удаление заказов </summary>
	public async Task<int> DeleteAsync(int[] ids) {
		return await context.Orders.Where(o => ids.Contains(o.Id)).ExecuteDeleteAsync();
	}
}

/// <summary> Dto обновления статуса заказа </summary>
public record OrderStatusMessage {
	/// <summary> Идентификатор </summary>
	public int Id { get; set; }

	/// <summary> Статус заказа </summary>
	public OrderStatus Status { set; get; }
}