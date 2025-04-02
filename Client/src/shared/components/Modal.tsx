import { ReactNode } from 'react'
import { CloseButton, Dialog, Portal } from '@chakra-ui/react'

interface ModalProps {
	open: boolean
	onClose: () => void
	title: string
	description: string
	children: ReactNode
}

export const Modal = ({ open, onClose, title, children, description }: ModalProps) => {
	return (
		<Dialog.Root open={open} onOpenChange={onClose} placement="center">
			<Portal>
				<Dialog.Backdrop />
				<Dialog.Positioner>
					<Dialog.Content>
						<Dialog.Body pt="4">
							<Dialog.Title>{title}</Dialog.Title>
							<Dialog.Description mb="4">
								{description}
							</Dialog.Description>
							{children}
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