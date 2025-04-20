import { Button } from '@chakra-ui/react'
import { Api } from '../../../../shared/api/Api.ts'
import { useEffect, FormEvent } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { Modal } from '../../../../shared/components/Modal.tsx'
import { Select } from '../../../../shared/components/Select.tsx'
import { OrderStatus } from '../../../../shared/types/Order'

/**
 * Status options for the select dropdown
 */
const options = [
	{ label: 'Создан', value: 'Created' },
	{ label: 'Отправлен', value: 'Shipped' },
	{ label: 'Доставлен', value: 'Delivered' },
	{ label: 'Отменен', value: 'Cancelled' }
]

/**
 * Props for OrderUpdateStatusForm component
 */
interface OrderUpdateStatusFormProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Form for updating order status
 */
export const OrderUpdateStatusForm = ({ isOpen, onClose }: OrderUpdateStatusFormProps) => {
	const queryClient = useQueryClient()
	const { orderId } = useParams()

	const { mutate: addOrder, isSuccess, isPending } = Api.useMutation('put', '/api/v1/orders/status', {
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['get', '/api/v1/orders/{id}'] })
	})

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const formData = new FormData(e.currentTarget)
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
	}, [isSuccess, onClose])


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