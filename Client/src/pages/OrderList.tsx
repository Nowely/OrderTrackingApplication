import { Box, Button, Center, Heading, List, Spinner, Stack, useDisclosure, VStack } from '@chakra-ui/react'
import { Link } from 'react-router'
import { OrderForm } from './OrderForm.tsx'
import { Api } from '../shared/api/api.ts'
import { formatDateIntl } from '../shared/utils/FormatDateIntl.tsx'

export const OrderList = () => {
	const {
		data: orders,
		error,
		isLoading
	} = Api.useQuery('get', '/api/v1/orders')
	const { open, onOpen, onClose } = useDisclosure()

	if (isLoading || !orders)
		return (
			<Center h="100vh">
				<Spinner color="teal.500" />
			</Center>
		)

	if (error) {
		console.error(error)
		return `An error occurred: ${error.title}`
	}

	return (
		<Box p={4}>
			<Stack direction={{ base: 'column', md: 'row' }} gap="52">
				<Heading mb={4}>Заказы</Heading>
				<Button onClick={onOpen} mb={4} children="Create New Order" />
			</Stack>

			<OrderForm isOpen={open} onClose={onClose} />

			<VStack align="stretch">
				<List.Root gap={3} variant="plain">
					{
						orders.length === 0 ? (
								<div>Заказы отсутствуют</div>
							) :
							orders.map((order) => (
								<List.Item
									key={order.id}
									p={2}
									borderWidth="1px"
									borderRadius="md"
								>
									<Link to={`/${order.id}`}>
										<VStack align={'left'} gap="2">
											<Heading size="sm">
												Заказ номер {order.orderNumber}
											</Heading>
											От {formatDateIntl(order.createdAt)}
										</VStack>
									</Link>
								</List.Item>
							))
					}
				</List.Root>
			</VStack>
		</Box>
	)
}

