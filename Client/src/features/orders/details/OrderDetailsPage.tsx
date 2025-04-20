import { Box, useDisclosure } from '@chakra-ui/react'
import { OrderUpdateStatusForm } from './components/OrderUpdateStatusForm'
import { StatusHistory } from './components/StatusHistory'
import { OrderDetailsPageHeader } from './components/OrderDetailsPageHeader'
import { OrderCard } from './components/OrderCard'

/**
 * Page component for displaying order details
 * Includes order information, status history, and status update functionality
 */
export const OrderDetailsPage = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()

	return (
		<Box p={4}>
			<OrderDetailsPageHeader onUpdateClick={onOpen} />
			<OrderUpdateStatusForm isOpen={isOpen} onClose={onClose} />
			<OrderCard />
			<br />
			<StatusHistory />
		</Box>
	)
}