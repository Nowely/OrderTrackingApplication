import { useParams } from 'react-router-dom'
import { Api } from '../../../shared/api/Api.ts'
import { Box, DataList } from '@chakra-ui/react'
import { translateOrderStatus } from '../../../shared/utils/translateOrderStatus.ts'
import { formatDate } from '../../../shared/utils/formatDate.ts'
import { Loading } from '../../../shared/components/Loading.tsx'
import { ErrorMessage } from '../../../shared/components/ErrorMessage.tsx'

export const OrderCard = () => {
	const { orderId } = useParams()
	const { data: order, error, isLoading } = Api.useQuery('get', '/api/v1/orders/{id}', {
		params: {
			path: {
				id: Number(orderId)
			}
		}
	})

	if (isLoading) return <Loading />

	if (error) return <ErrorMessage error={error} />

	if (!order) return <Box p={4}>Order not found</Box>

	return (
		<DataList.Root orientation="horizontal">
			<DataList.Item>
				<DataList.ItemLabel>Статус</DataList.ItemLabel>
				<DataList.ItemValue>{translateOrderStatus(order.status)}</DataList.ItemValue>
			</DataList.Item>

			<DataList.Item>
				<DataList.ItemLabel>Дата создания</DataList.ItemLabel>
				<DataList.ItemValue>{formatDate(order.createdAt)}</DataList.ItemValue>
			</DataList.Item>

			<DataList.Item>
				<DataList.ItemLabel>Дата изменения</DataList.ItemLabel>
				<DataList.ItemValue>{formatDate(order.updatedAt)}</DataList.ItemValue>
			</DataList.Item>

			<DataList.Item>
				<DataList.ItemLabel>Описание</DataList.ItemLabel>
				<DataList.ItemValue>{order.description}</DataList.ItemValue>
			</DataList.Item>
		</DataList.Root>
	)
}