import { Button, Heading, Stack } from '@chakra-ui/react'

interface OrderHeaderProps {
	onCreateClick: () => void
}

export const OrderPageHeader = ({onCreateClick} : OrderHeaderProps) => {

	return (
		<Stack direction={{ base: 'column', md: 'row' }} gap="52">
			<Heading mb={4}>Заказы</Heading>
			<Button onClick={onCreateClick} mb={4} children="Создать новый заказ" />
		</Stack>
	)
}