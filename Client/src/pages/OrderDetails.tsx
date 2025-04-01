import { useParams } from 'react-router-dom'
import { Box, DataList, Heading } from '@chakra-ui/react'
import { Api, BASE_URL } from '../shared/api/api.ts'
import { formatDateIntl } from '../shared/utils/FormatDateIntl.tsx'
import { useEffect } from 'react'

export const OrderDetails = () => {
	const { orderId } = useParams()
	const { data: order } = Api.useQuery('get', '/api/v1/orders/{id}', {
		params: {
			path: {
				id: Number(orderId)
			}
		}
	})

	//const { data } = Api.useQuery('get', '/api/v1/orders/status/subscribtion')

	//const { orders, updateOrderStatus } = useOrderStore()
	//const order = orders.find((o) => o.id === orderId)

	useEffect(() => {
		if (!orderId) return

		//const eventSource = new EventSource(`/api/orders/${orderId}/stream`)
		const eventSource = new EventSource(`${BASE_URL}/api/v1/orders/status/subscription`)

		eventSource.onmessage = (e) => {
			const data = JSON.parse(e.data)
			console.log(data)
			//updateOrderStatus(orderId, data.status)
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

			{/*<Heading size="md" mb={2}>
				Status History
			</Heading>

			<List.Root spacing={3}>
				{order.updates.map((update, index) => (
					<ListItem key={index}>
						<Badge mr={2}>
							{new Date(update.timestamp).toLocaleTimeString()}
						</Badge>
						<Tag colorScheme={colorSchemes[update.status]}>
							{update.status}
						</Tag>
					</ListItem>
				))}
			</List.Root>*/}
		</Box>
	)
}

function translateStatus(status: 'Created' | 'Shipped' | 'Delivered' | 'Cancelled') {
	switch (status) {
		case "Created":
			return "Создан"
		case "Shipped":
			return "Отправлен"
		case "Delivered":
			return "Доставлен"
		case "Cancelled":
			return "Отменен"
	}
}