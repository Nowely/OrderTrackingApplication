import { Route, Routes } from 'react-router'
import { OrderListPage } from '../pages/OrderList'
import { Center } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { OrderDetailsPage } from '../pages/OrderDetails'

const queryClient = new QueryClient()

export const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<Center>
				<Routes>
					<Route path="/" element={<OrderListPage />} />
					<Route path="/:orderId" element={<OrderDetailsPage/>}/>
				</Routes>
			</Center>
		</QueryClientProvider>
	)
}
