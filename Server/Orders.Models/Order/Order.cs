using System.ComponentModel.DataAnnotations.Schema;
using Tools.Infrastructure;

namespace Orders.Models;

/// <summary> Модель заказа </summary>
public class Order: ICreatable, IUpdatable {
	/// <summary> Идентификатор </summary>
	public int Id { get; set; }

	/// <summary> Дата создания </summary>
	public DateTime CreatedAt { get; set; }

	/// <summary> Дата изменения </summary>
	public DateTime UpdatedAt { get; set; }

	/// <summary> Номер заказа </summary>
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
	public int OrderNumber { get; set; }

	/// <summary> Статус заказа </summary>
	public OrderStatus Status { set; get; }

	/// <summary> Описание заказа </summary>
	public string Description { get; set; } = string.Empty;
}