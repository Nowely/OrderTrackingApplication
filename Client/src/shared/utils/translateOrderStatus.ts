export function translateOrderStatus(status: 'Created' | 'Shipped' | 'Delivered' | 'Cancelled') {
	switch (status) {
		case 'Created':
			return 'Создан'
		case 'Shipped':
			return 'Отправлен'
		case 'Delivered':
			return 'Доставлен'
		case 'Cancelled':
			return 'Отменен'
	}
}