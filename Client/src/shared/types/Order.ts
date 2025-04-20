import { components } from '../api/orders.v1';

/**
 * Order status enum
 */
export type OrderStatus = components['schemas']['OrderStatus'];

/**
 * Order status message interface
 */
export interface OrderStatusMessage {
  id: string;
  status: OrderStatus;
  updatedAt: string;
}

/**
 * Order interface
 */
export interface Order {
  id: number;
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  status: OrderStatus;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Order item interface
 */
export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}