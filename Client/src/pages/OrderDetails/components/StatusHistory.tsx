import { useOrderStatusStore } from '../utils/OrderStatusStore.ts'
import { useParams } from 'react-router-dom'
import { Badge, Box, Heading, List, ListItem } from '@chakra-ui/react'
import { formatDate } from '../../../shared/utils/formatDate.ts'
import { translateOrderStatus } from '../../../shared/utils/translateOrderStatus.ts'
import { useEffect } from 'react'
import { BaseUrl } from '../../../shared/api/BaseUrl.ts'

export const StatusHistory = () => {
	const { statuses } = useOrderStatusStore()
	const { orderId } = useParams()

	useStatusSubscription()

	return (
		<Box>
			<Heading size="md" mb={2}> История изменений </Heading>

			<List.Root gap={3}>
				{statuses
					.filter(value => value.id == orderId)
					.map((value, index) => (
						<ListItem key={index}>
							Статус изменен <Badge> {formatDate(value.updatedAt)} </Badge>
							на <Badge> {translateOrderStatus(value.status)} </Badge>
						</ListItem>
					))}
			</List.Root>
		</Box>
	)
}

const useStatusSubscription = () => {
	const { addStatus } = useOrderStatusStore()

	useEffect(() => {
		const eventSource = new EventSource(`${BaseUrl}/api/v1/orders/status/subscription`)

		eventSource.onmessage = (e) => {
			const data = JSON.parse(e.data)
			addStatus(data)
		}

		return () => eventSource.close()
	}, [])
}