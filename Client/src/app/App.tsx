import { Route, Routes } from 'react-router'
import { OrderList } from '../pages/OrderList.tsx'
import { Center } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<Center>
				<Routes>
					<Route path="/" element={<OrderList />} />
					{/*<Route path="/orders/:orderId" element={<OrderDetails/>}/>*/}
				</Routes>
			</Center>
		</QueryClientProvider>
	)
}
