// components/OrderForm.tsx
import {
	Input,
	Button,
	Dialog, Portal, AspectRatio, CloseButton,
} from '@chakra-ui/react';
import { useRef } from 'react';
import {useOrderStore} from "./useOrderStore.ts";

export const OrderForm = ({isOpen, onClose}: any) => {
	const { addOrder } = useOrderStore();
	const inputRef = useRef<HTMLInputElement>(null);

	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (inputRef.current?.value) {
			addOrder({ title: inputRef.current.value });
			onClose();
		}
	};

	return (
		<Dialog.Root open={isOpen} onOpenChange={onClose} placement="center">
			<Portal>
				<Dialog.Backdrop />
				<Dialog.Positioner>
					<Dialog.Content>
						<Dialog.Body pt="4">
							<Dialog.Title>Create New Order</Dialog.Title>
							<Dialog.Description mb="4">
								This is a dialog with some content and a video.
							</Dialog.Description>
							<AspectRatio ratio={4 / 3} rounded="lg" overflow="hidden">
								<form onSubmit={handleSubmit}>
									{/*<FormControl>
										<FormLabel>Order Title</FormLabel>
										<Input ref={inputRef} placeholder="Enter order title" />
									</FormControl>*/}

									<Button mt={4} colorScheme="blue" type="submit">
										Create
									</Button>
								</form>
							</AspectRatio>
						</Dialog.Body>
						<Dialog.CloseTrigger top="0" insetEnd="-12" asChild>
							<CloseButton bg="bg" size="sm" />
						</Dialog.CloseTrigger>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	);
}