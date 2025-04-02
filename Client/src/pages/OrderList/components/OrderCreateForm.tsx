import { Button, Input } from '@chakra-ui/react'
import { Api } from '../../../shared/api/Api.ts'
import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { Modal } from '../../../shared/components/Modal.tsx'

export const OrderCreateForm = ({ isOpen, onClose }: any) => {
	const queryClient = useQueryClient()
	const { mutate: addOrder, isSuccess, isPending } = Api.useMutation('post', '/api/v1/orders', {
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['get', '/api/v1/orders'] })
	})

	const handleSubmit = (e: any) => {
		e.preventDefault()

		const formData = new FormData(e.target)
		const description = formData.get('description')?.toString()

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
		<Modal
			open={isOpen}
			onClose={onClose}
			title="Создание нового заказа"
			description="Заполните поля и нажмите 'Создать'"
		>
			<form onSubmit={handleSubmit}>
				<Input
					name="description"
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
		</Modal>
	)
}

