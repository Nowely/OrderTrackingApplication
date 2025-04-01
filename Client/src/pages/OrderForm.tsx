import { Button, CloseButton, Dialog, Input, Portal } from '@chakra-ui/react'
import { Api } from '../shared/api/api.ts'
import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'

export const OrderForm = ({ isOpen, onClose }: any) => {
	const queryClient = useQueryClient()

	const { mutate: addOrder, isSuccess, isPending } = Api.useMutation('post', '/api/v1/orders', {
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['get', '/api/v1/orders'] })
	})

	const handleSubmit = (e: any) => {
		e.preventDefault()

		const formData = new FormData(e.target)
		const description = formData.get('OrderName')?.toString()

		if (description) {
			addOrder({ body: { description } })
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
							<Dialog.Title>Создание нового заказа</Dialog.Title>
							<Dialog.Description mb="4">
								Заполните поля и нажмите "Создать"
							</Dialog.Description>
							<form onSubmit={handleSubmit}>
								<Input
									name="OrderName"
									placeholder="Введите описание заказа"
								/>
								<Button
									placeContent="center"
									mt={4}
									colorScheme="blue"
									type="submit"
									loading={isPending}
									children="Создать"
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
