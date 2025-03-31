namespace Orders.Models;

/// <summary> Dto информации об заказе </summary>
public record OrderGet {
	/// <summary> Идентификатор </summary>
	public int Id { get; set; }

	/// <summary> Дата создания </summary>
	public DateTime CreatedAt { get; set; }

	/// <summary> Дата изменения </summary>
	public DateTime UpdatedAt { get; set; }

	/// <summary> Номер заказа </summary>
	public int OrderNumber { get; set; }

	/// <summary> Статус заказа </summary>
	public OrderStatus Status { set; get; }

	/// <summary> Описание заказа </summary>
	public required string Description { get; set; }
}