using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Tools.Infrastructure;

namespace Orders.Infrastructure;

/// <summary> Интерцептор для создания записей </summary>
public class CreateInterceptor : SaveChangesInterceptor {
	/// <inheritdoc />
	public override ValueTask<InterceptionResult<int>> SavingChangesAsync(
		DbContextEventData eventData,
		InterceptionResult<int> result,
		CancellationToken cancellationToken = default
	) {
		if (eventData.Context is null) return new ValueTask<InterceptionResult<int>>(result);

		var addedEntries = eventData.Context.ChangeTracker.Entries()
			.Where(entry => entry is { State: EntityState.Added });
		foreach (var entry in addedEntries) SetCreatedProp(entry);

		return new ValueTask<InterceptionResult<int>>(result);
	}

	private static void SetCreatedProp(EntityEntry entry) {
		if (entry is not { Entity: ICreatable entity } || entity.CreatedAt != default) return;
		entity.CreatedAt = DateTime.UtcNow;
	}
}