import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Badge, Box, Heading, List, ListItem, Tag } from '@chakra-ui/react'
import { useOrderStore } from './useOrderStore.ts'

export const OrderDetails = () => {
	const { orderId } = useParams()
	const { orders, updateOrderStatus } = useOrderStore()
	const order = orders.find((o) => o.id === orderId)

	useEffect(() => {
		if (!orderId) return

		const eventSource = new EventSource(`/api/orders/${orderId}/stream`)

		eventSource.onmessage = (e) => {
			const data = JSON.parse(e.data)
			updateOrderStatus(orderId, data.status)
		}

		return () => eventSource.close()
	}, [orderId, updateOrderStatus])

	if (!order) return <Box p={4}>Order not found</Box>

	return (
		<Box p={4}>
			<Heading mb={4}>{order.title}</Heading>
			<Tag.Root colorScheme={colorSchemes[order.status]} mb={4}>
				Current Status: {order.status}
			</Tag.Root>

			<Heading size="md" mb={2}>
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
			</List.Root>
		</Box>
	)
}
// Reuse same colorSchemes object from StatusBadge component
const colorSchemes = {
	pending: 'yellow',
	processing: 'blue',
	shipped: 'green',
	delivered: 'gray'
}
