export type UserStatus = 'Active' | 'Suspended';
export type CourierStatus = 'Online' | 'Offline' | 'Suspended';
export type DeliveryStatus = 'Completed' | 'Failed' | 'Cancelled' | 'In Progress';

export interface User {
  id: string;
  username: string;
  email: string;
  wPoints: number;
  totalDeliveries: number;
  status: UserStatus;
  joinedAt: Date;
}

export interface Courier {
  id: string;
  name: string;
  totalDeliveries: number;
  successRate: number; // Percentage 0-100
  status: CourierStatus;
  wEarned: number;
  joinedAt: Date;
}

export interface Delivery {
  id: string;
  userId: string;
  courierId: string;
  status: DeliveryStatus;
  wEarned: number;
  date: Date;
  pickupAddress: string;
  dropoffAddress: string;
}

export interface WTransaction {
  id: string;
  targetId: string; // User or Courier ID
  targetType: 'User' | 'Courier';
  amount: number;
  type: 'Credit' | 'Debit';
  reason: string;
  timestamp: Date;
  adminId: string;
}

export interface SystemLog {
  id: string;
  action: string;
  details: string;
  adminId: string;
  timestamp: Date;
}
