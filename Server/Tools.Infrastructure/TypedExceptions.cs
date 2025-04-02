namespace Tools.Infrastructure;

/// <summary> Класс ошибки для сопоставления с ответом ValidationProblemDetails </summary>
public class ValidationException(string? message, Dictionary<string, string[]> errors) : Exception(message) {
	/// <summary> Ошибки валидации. Сопоставляется как имя - поля, его ошибки. </summary>
	public Dictionary<string, string[]> Errors { get; set; } = errors;
}

/// <summary> Класс ошибки для сопостовления с ответом NotFound </summary>
public class NotFoundException(string? message) : Exception(message);