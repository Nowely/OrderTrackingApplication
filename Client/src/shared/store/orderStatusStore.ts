import { create } from 'zustand';
import { OrderStatus, OrderStatusMessage } from '../types/Order';
import { persist } from 'zustand/middleware';

/**
 * Order status store interface
 */
interface OrderStatusStore {
  // State
  statuses: OrderStatusMessage[];
  
  // Actions
  addStatus: (status: OrderStatusMessage) => void;
  clearStatuses: () => void;
  getStatusesByOrderId: (orderId: string) => OrderStatusMessage[];
}

/**
 * Order status store with persistence
 * Uses localStorage to cache status history between sessions
 */
export const useOrderStatusStore = create<OrderStatusStore>()(
  persist(
    (set, get) => ({
      // Initial state
      statuses: [],
      
      // Actions
      addStatus: (status: OrderStatusMessage) => {
        set((state) => ({ 
          statuses: [...state.statuses, status] 
        }));
      },
      
      clearStatuses: () => {
        set({ statuses: [] });
      },
      
      getStatusesByOrderId: (orderId: string) => {
        return get().statuses.filter(status => status.id === orderId);
      }
    }),
    {
      name: 'order-status-storage', // Storage key in localStorage
    }
  )
);