import { useParams } from 'react-router-dom'
import { Badge, Box, Heading, List, ListItem } from '@chakra-ui/react'
import { formatDate } from '../../../../shared/utils/formatDate.ts'
import { translateOrderStatus } from '../../../../shared/utils/translateOrderStatus.ts'
import { useEffect } from 'react'
import { BaseUrl } from '../../../../shared/api/BaseUrl.ts'
import { useOrderStatusStore } from '../../../../shared/store/orderStatusStore.ts'

/**
 * Component that displays the history of status changes for an order
 */
export const StatusHistory = () => {
	const { orderId } = useParams()
	const statuses = useOrderStatusStore(state => 
		state.getStatusesByOrderId(orderId || '')
	)

	useStatusSubscription()

	return (
		<Box>
			<Heading size="md" mb={2}> История изменений </Heading>

			<List.Root gap={3}>
				{statuses.map((value, index) => (
					<ListItem key={index}>
						Статус изменен <Badge> {formatDate(value.updatedAt)} </Badge>
						на <Badge> {translateOrderStatus(value.status)} </Badge>
					</ListItem>
				))}
			</List.Root>
		</Box>
	)
}

/**
 * Custom hook for subscribing to status updates via SSE
 */
const useStatusSubscription = () => {
	const { addStatus } = useOrderStatusStore()

	useEffect(() => {
		const eventSource = new EventSource(`${BaseUrl}/api/v1/orders/status/subscription`)

		eventSource.onmessage = (e) => {
			const data = JSON.parse(e.data)
			addStatus(data)
		}

		return () => eventSource.close()
	}, [addStatus])
}