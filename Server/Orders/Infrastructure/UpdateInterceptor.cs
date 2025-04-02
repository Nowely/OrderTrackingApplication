using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Tools.Infrastructure;

namespace Orders.Infrastructure;

/// <summary> Интерсептор для обновления записей </summary>
public class UpdateInterceptor : SaveChangesInterceptor {
	/// <inheritdoc />
	public override ValueTask<InterceptionResult<int>> SavingChangesAsync(
		DbContextEventData eventData,
		InterceptionResult<int> result,
		CancellationToken cancellationToken = default
	) {
		if (eventData.Context is null) return new ValueTask<InterceptionResult<int>>(result);

		var updatedEntries = eventData.Context.ChangeTracker.Entries()
			.Where(entry => entry is { State: EntityState.Added or EntityState.Modified });
		foreach (var entry in updatedEntries) SetUpdatedProp(entry);

		return new ValueTask<InterceptionResult<int>>(result);
	}

	private static void SetUpdatedProp(EntityEntry entry) {
		if (entry is not { Entity: IUpdatable entity }) return;
		entity.UpdatedAt = DateTime.UtcNow;
	}
}