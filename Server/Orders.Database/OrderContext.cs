using Microsoft.EntityFrameworkCore;
using Orders.Models;

namespace Orders.Database;

/// <summary> Контекст базы данных заказов </summary>
public sealed class OrderContext : DbContext {
	/// <summary> Initializing constructor </summary>
	public OrderContext(DbContextOptions<OrderContext> options) : base(options) {
		Database.EnsureDeleted();
		Database.EnsureCreated();
		//DbInitializer.Initialize(this);
	}

	/// <summary> Заказы </summary>
	public DbSet<Order> Orders => Set<Order>();

	/// <inheritdoc />
	protected override void OnModelCreating(ModelBuilder modelBuilder) {
	}
}