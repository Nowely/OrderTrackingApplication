import { Button } from '@chakra-ui/react'
import { Api } from '../../../shared/api/Api.ts'
import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { OrderStatus } from '../utils/OrderStatusStore.ts'
import { Modal } from '../../../shared/components/Modal.tsx'
import { Select } from '../../../shared/components/Select.tsx'

const options = [
	{ label: 'Создан', value: 'Created' },
	{ label: 'Отправлен', value: 'Shipped' },
	{ label: 'Доставлен', value: 'Delivered' },
	{ label: 'Отменен', value: 'Cancelled' }
]

export const OrderUpdateStatusForm = ({ isOpen, onClose }: any) => {
	const queryClient = useQueryClient()
	const { orderId } = useParams()

	const { mutate: addOrder, isSuccess, isPending } = Api.useMutation('put', '/api/v1/orders/status', {
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['get', '/api/v1/orders/{id}'] })
	})

	const handleSubmit = (e: any) => {
		e.preventDefault()

		const formData = new FormData(e.target)
		const newStatus = formData.get('status')?.toString() as OrderStatus

		if (orderId && newStatus) {
			addOrder({
				body: {
					id: Number(orderId),
					status: newStatus
				}
			})
		}
	}

	useEffect(() => {
		if (isSuccess) {
			onClose()
		}
	}, [isSuccess])


	return (
		<Modal
			open={isOpen}
			onClose={onClose}
			title="Обновление статуса заказа"
			description="Заполните поля и нажмите 'Обновить'"
		>
			<form onSubmit={handleSubmit}>
				<Select options={options} placeholder="Выберите статус"/>
				<Button
					placeContent="center"
					mt={4}
					colorScheme="blue"
					type="submit"
					loading={isPending}
					children="Обновить"
				/>
			</form>
		</Modal>
	)
}

