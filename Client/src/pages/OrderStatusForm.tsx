import { Button, CloseButton, createListCollection, Dialog, Portal, Select } from '@chakra-ui/react'
import { Api } from '../shared/api/Api.ts'
import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { OrderStatus } from './useOrderStore.ts'

const statusOptions = createListCollection({
	items: [
		{ label: 'Создан', value: 'Created' },
		{ label: 'Отправлен', value: 'Shipped' },
		{ label: 'Доставлен', value: 'Delivered' },
		{ label: 'Отменен', value: 'Cancelled' }
	]
})

export const OrderStatusForm = ({ isOpen, onClose }: any) => {
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
		<Dialog.Root open={isOpen} onOpenChange={onClose} placement="center">
			<Portal>
				<Dialog.Backdrop />
				<Dialog.Positioner>
					<Dialog.Content>
						<Dialog.Body pt="4">
							<Dialog.Title>Обновление статуса заказа</Dialog.Title>
							<Dialog.Description mb="4">
								Заполните поля и нажмите "Создать"
							</Dialog.Description>
							<form onSubmit={handleSubmit}>

								<Select.Root name="status" collection={statusOptions} size="sm" width="320px">
									<Select.HiddenSelect />
									<Select.Control>
										<Select.Trigger>
											<Select.ValueText placeholder="Выберите статус" />
										</Select.Trigger>
										<Select.IndicatorGroup>
											<Select.Indicator />
										</Select.IndicatorGroup>
									</Select.Control>
									<>
										<Select.Positioner>
											<Select.Content>
												{statusOptions.items.map((framework) => (
													<Select.Item item={framework} key={framework.value}>
														{framework.label}
														<Select.ItemIndicator />
													</Select.Item>
												))}
											</Select.Content>
										</Select.Positioner>
									</>
								</Select.Root>

								<Button
									placeContent="center"
									mt={4}
									colorScheme="blue"
									type="submit"
									loading={isPending}
									children="Обновить"
								/>
							</form>
						</Dialog.Body>
						<Dialog.CloseTrigger top="0" insetEnd="-12" asChild>
							<CloseButton bg="bg" size="sm" />
						</Dialog.CloseTrigger>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	)
}
