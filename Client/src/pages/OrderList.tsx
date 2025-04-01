import {Box, Button, Center, Heading, List, Spinner, Stack, Tag, useDisclosure, VStack} from '@chakra-ui/react';
import {Link} from 'react-router';
import {OrderForm} from "./OrderForm.tsx";
import {Api} from "../shared/api/api.ts";

export const OrderList = () => {
	const {data: orders, error, isLoading} = Api.useQuery("get", "/api/v1/orders")
	const {open, onOpen, onClose} = useDisclosure();

	if (isLoading || !orders) return <Center h="100vh">
		<Spinner color="teal.500"/>
	</Center>;

	if (error) {
		console.error(error);
		return `An error occurred: ${error.title}`;
	}

	return (
		<Box p={4}>
			<Stack direction={{base: "column", md: "row"}} gap="52">
				<Heading mb={4}>Orders</Heading>
				<Button onClick={onOpen} mb={4} children="Create New Order"/>
			</Stack>

			<OrderForm isOpen={open} onClose={onClose}/>

			<VStack align="stretch">
				<List.Root gap={3} variant="plain">
					{orders.map((order) => (
						<List.Item
							key={order.id}
							p={2}
							borderWidth="1px"
							borderRadius="md"
						>
							<Link to={`/orders/${order.id}`}>
								<VStack align={"left"} gap="2">
									<Heading size="sm">Номер заказа {order.orderNumber}</Heading>
									От {formatDateIntl(new Date())}
								</VStack>
							</Link>
						</List.Item>
					))}
				</List.Root>
			</VStack>
		</Box>
	);
}

function formatDateIntl(date: Date): string {
	return new Intl.DateTimeFormat('ru-RU', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		hour12: false
	}).format(date);
}

const StatusBadge = ({status}: { status: any }) => {
	const colorSchemes = {
		pending: 'yellow',
		processing: 'blue',
		shipped: 'green',
		delivered: 'gray'
	};

	return (
		<Tag.Root
			colorScheme={'dark'}
			size="sm"
			mt={2}
		>
			{status}
		</Tag.Root>
	);
};