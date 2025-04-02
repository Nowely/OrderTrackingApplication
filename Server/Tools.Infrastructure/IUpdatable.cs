namespace Tools.Infrastructure;

/// <summary>Для даты обновления при сохранении в бд </summary>
public interface IUpdatable {
	/// <summary> Дата обновления </summary>
	DateTime UpdatedAt { get; set; }
}