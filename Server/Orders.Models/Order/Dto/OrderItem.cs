namespace Orders.Models;

/// <summary> Dto информации об заказе </summary>
public record OrderItem {
	/// <summary> Идентификатор </summary>
	public int Id { get; set; }

	/// <summary> Номер заказа </summary>
	public int OrderNumber { get; set; }

	/// <summary> Статус заказа </summary>
	public OrderStatus Status { set; get; }
}