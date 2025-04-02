import { Box, useDisclosure } from '@chakra-ui/react'
import { OrderCreateForm } from './components/OrderCreateForm.tsx'
import { OrderList } from './components/OrderList.tsx'
import { OrderPageHeader } from './components/OrderPageHeader.tsx'

export const OrderListPage = () => {
	const { open, onOpen, onClose } = useDisclosure()

	return (
		<Box p={4}>
			<OrderPageHeader onCreateClick={onOpen} />
			<OrderCreateForm isOpen={open} onClose={onClose} />
			<OrderList />
		</Box>
	)
}



