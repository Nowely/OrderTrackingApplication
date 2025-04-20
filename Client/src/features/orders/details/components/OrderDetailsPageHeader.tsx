import { Button, Heading, Stack } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

/**
 * Props for OrderDetailsPageHeader component
 */
interface OrderDetailsPageHeaderProps {
	onUpdateClick: () => void
}

/**
 * Header component for the order details page
 * Displays the order ID and a button to update the order status
 */
export const OrderDetailsPageHeader = ({ onUpdateClick }: OrderDetailsPageHeaderProps) => {
	const { orderId } = useParams()

	return (
		<Stack direction={{ base: 'column', md: 'row' }} gap="52">
			<Heading mb={4}>Заказ номер {orderId}</Heading>
			<Button onClick={onUpdateClick} mb={4} children="Обновить статус" />
		</Stack>
	)
}