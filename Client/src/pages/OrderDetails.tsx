import { useParams } from 'react-router-dom'
import { Badge, Box, DataList, Heading, HStack, List, ListItem } from '@chakra-ui/react'
import { Api, BASE_URL } from '../shared/api/api.ts'
import { formatDateIntl } from '../shared/utils/FormatDateIntl.tsx'
import { useEffect } from 'react'
import { useOrderStatusStore } from './useOrderStore.ts'

export const OrderDetails = () => {
	const { orderId } = useParams()
	const { data: order } = Api.useQuery('get', '/api/v1/orders/{id}', {
		params: {
			path: {
				id: Number(orderId)
			}
		}
	})

	const { statuses, addStatus } = useOrderStatusStore()

	useEffect(() => {
		if (!orderId) return

		const eventSource = new EventSource(`${BASE_URL}/api/v1/orders/status/subscription`)

		eventSource.onmessage = (e) => {
			const data = JSON.parse(e.data)
			addStatus(data)
		}

		return () => eventSource.close()
	}, [orderId])

	if (!order) return <Box p={4}>Order not found</Box>

	return (
		<Box p={4}>
			<Heading mb={4}>Заказ номер {order.orderNumber}</Heading>

			<DataList.Root orientation="horizontal">
				<DataList.Item>
					<DataList.ItemLabel>Статус</DataList.ItemLabel>
					<DataList.ItemValue>{translateStatus(order.status)}</DataList.ItemValue>
				</DataList.Item>

				<DataList.Item>
					<DataList.ItemLabel>Дата создания</DataList.ItemLabel>
					<DataList.ItemValue>{formatDateIntl(order.createdAt)}</DataList.ItemValue>
				</DataList.Item>

				<DataList.Item>
					<DataList.ItemLabel>Дата изменения</DataList.ItemLabel>
					<DataList.ItemValue>{formatDateIntl(order.updatedAt)}</DataList.ItemValue>
				</DataList.Item>

				<DataList.Item>
					<DataList.ItemLabel>Описание</DataList.ItemLabel>
					<DataList.ItemValue>{order.description}</DataList.ItemValue>
				</DataList.Item>
			</DataList.Root>

			<br />
			<Heading size="md" mb={2}> История изменения </Heading>

			<List.Root gap={3}>
				{statuses
					.filter(value => value.id == orderId)
					.map((value, index) => (
						<ListItem key={index}>
								Статус изменен <Badge> {formatDateIntl(value.updatedAt)} </Badge>
								на <Badge> {translateStatus(value.status)} </Badge>
						</ListItem>
					))}
			</List.Root>
		</Box>
	)
}

function translateStatus(status: 'Created' | 'Shipped' | 'Delivered' | 'Cancelled') {
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