namespace Orders.Models;

/// <summary> Dto обновления статуса заказа </summary>
public record OrderStatusUpdate {
	/// <summary> Идентификатор </summary>
	public int Id { get; set; }

	/// <summary> Статус заказа </summary>
	public OrderStatus Status { set; get; }
}