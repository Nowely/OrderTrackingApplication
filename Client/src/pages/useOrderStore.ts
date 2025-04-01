// store/orderStore.ts
import { create } from 'zustand'

interface Order {
	id: string
	title: string
	status: 'pending' | 'processing' | 'shipped' | 'delivered'
	createdAt: Date
	updates: { status: string; timestamp: Date }[]
}

interface OrderStore {
	orders: Order[]
	addOrder: (
		order: Omit<Order, 'id' | 'createdAt' | 'status' | 'updates'>
	) => void
	updateOrderStatus: (orderId: string, newStatus: Order['status']) => void
}

export const useOrderStore = create<OrderStore>((set) => ({
	orders: [],
	addOrder: (order) =>
		set((state) => ({
			orders: [
				...state.orders,
				{
					...order,
					id: Math.random().toString(36).substr(2, 9),
					status: 'pending',
					createdAt: new Date(),
					updates: []
				}
			]
		})),
	updateOrderStatus: (orderId, newStatus) =>
		set((state) => ({
			orders: state.orders.map((order) =>
				order.id === orderId
					? {
							...order,
							status: newStatus,
							updates: [
								...order.updates,
								{
									status: newStatus,
									timestamp: new Date()
								}
							]
						}
					: order
			)
		}))
}))
