using Microsoft.EntityFrameworkCore;

namespace Orders.Infrastructure;

/// <summary> Контекст базы данных заказов </summary>
public sealed class OrderContext : DbContext {
	/// <summary> Initializing constructor </summary>
	public OrderContext(DbContextOptions<OrderContext> options) : base(options) {
		Database.EnsureDeleted();
		Database.EnsureCreated();
		//DbInitializer.Initialize(this);
	}
}