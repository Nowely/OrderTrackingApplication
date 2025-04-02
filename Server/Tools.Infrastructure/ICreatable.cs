namespace Tools.Infrastructure;

/// <summary>Для добавления даты создания при добавлении в бд </summary>
public interface ICreatable {
	/// <summary> Дата создания </summary>
	DateTime CreatedAt { get; set; }
}