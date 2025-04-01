// store/orderStore.ts
import { create } from 'zustand'
import { components } from '../shared/api/orders.v1'

type OrderStatus = components['schemas']['OrderStatus']

interface OrderStatusMessage {
	id: string
	status: OrderStatus
	updatedAt: string
}

interface OrderStatusStore {
	statuses: OrderStatusMessage[]
	addStatus: (order: OrderStatusMessage) => void,
}

export const useOrderStatusStore = create<OrderStatusStore>((set) => ({
	statuses: [],
	addStatus: (status: OrderStatusMessage) => {
		 set((state) => ({ statuses: [...state.statuses, status] }))
	}
}))
