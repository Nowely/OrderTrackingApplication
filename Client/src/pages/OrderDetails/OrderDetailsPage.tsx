import { Box, useDisclosure } from '@chakra-ui/react'
import { OrderUpdateStatusForm } from './components/OrderUpdateStatusForm.tsx'
import { StatusHistory } from './components/StatusHistory.tsx'
import { OrderDetailsPageHeader } from './components/OrderDetailsPageHeader.tsx'
import { OrderCard } from './components/OrderCard.tsx'

export const OrderDetailsPage = () => {
	const { open, onOpen, onClose } = useDisclosure()

	return (
		<Box p={4}>
			<OrderDetailsPageHeader onUpdateClick={onOpen} />
			<OrderUpdateStatusForm isOpen={open} onClose={onClose} />
			<OrderCard />
			<br />
			<StatusHistory />
		</Box>
	)
}

