import { Heading, List, VStack } from '@chakra-ui/react'
import { Link } from 'react-router'
import { formatDate } from '../../../shared/utils/formatDate.ts'
import { Api } from '../../../shared/api/Api.ts'
import { Loading } from '../../../shared/components/Loading.tsx'
import { ErrorMessage } from '../../../shared/components/ErrorMessage.tsx'

export const OrderList = () => {
	const { data: orders, error, isLoading } = Api.useQuery('get', '/api/v1/orders')

	if (isLoading || !orders) return <Loading />

	if (error) return <ErrorMessage error={error} />

	return (
		<List.Root gap={3} variant="plain">
			{
				orders.length === 0
					? <div>Заказы отсутствуют</div>
					: orders.map((order) => (
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
									От {formatDate(order.createdAt)}
								</VStack>
							</Link>
						</List.Item>
					))
			}
		</List.Root>
	)
}

