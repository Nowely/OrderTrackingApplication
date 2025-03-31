using Riok.Mapperly.Abstractions;

namespace Orders.Models;

/// <summary> Мапер моделей заказа </summary>
[Mapper]
public static partial class OrderMapper {
	/// <summary> Проекция в Get dto </summary>
	public static partial IQueryable<OrderGet> ProjectToGet(this IQueryable<Order> source);

	/// <summary> Проекция в Item dto </summary>
	public static partial IQueryable<OrderItem> ProjectToItem(this IQueryable<Order> source);

	/// <summary> Преобразовать dto в доменную модель </summary>
	public static partial Order ToEntity(this OrderCreate source);

	/// <summary> Преобразовать доменную модель в Get dto </summary>
	public static partial OrderGet ToGet(this Order source);
}