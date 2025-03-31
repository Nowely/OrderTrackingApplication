namespace Orders.Models;

/// <summary> Dto создания заказа </summary>
public record OrderCreate {
	/// <summary> Описание заказа </summary>
	public string Description { get; set; } = string.Empty;
}