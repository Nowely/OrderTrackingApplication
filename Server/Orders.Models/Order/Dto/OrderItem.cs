namespace Orders.Models;

/// <summary> Dto информации об заказе </summary>
public record OrderItem {
	/// <summary> Идентификатор </summary>
	public int Id { get; set; }

	/// <summary> Номер заказа </summary>
	public int OrderNumber { get; set; }

	/// <summary> Дата создания </summary>
	public DateTime CreatedAt { get; set; }
}