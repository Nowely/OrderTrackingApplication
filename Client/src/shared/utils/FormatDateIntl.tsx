export function formatDateIntl(date?: string): string {
	if (!date) {
		return '';
	}
	return new Intl.DateTimeFormat('ru-RU', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		hour12: false
	}).format(new Date(date))
}