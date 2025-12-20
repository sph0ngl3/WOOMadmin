import { faker } from '@faker-js/faker';
import { User, Courier, Delivery, WTransaction, SystemLog } from '@/types';

// Deterministic seed for consistent UI during dev
faker.seed(123);

export const generateUsers = (count: number): User[] => {
  return Array.from({ length: count }).map(() => ({
    id: faker.string.uuid(),
    username: faker.internet.username(),
    email: faker.internet.email(),
    wPoints: faker.number.int({ min: 0, max: 5000 }),
    totalDeliveries: faker.number.int({ min: 0, max: 100 }),
    status: faker.helpers.arrayElement(['Active', 'Suspended']),
    joinedAt: faker.date.past(),
  }));
};

export const generateCouriers = (count: number): Courier[] => {
  return Array.from({ length: count }).map(() => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    totalDeliveries: faker.number.int({ min: 50, max: 1000 }),
    successRate: faker.number.float({ min: 85, max: 100, fractionDigits: 1 }),
    status: faker.helpers.arrayElement(['Online', 'Offline', 'Suspended']),
    wEarned: faker.number.int({ min: 1000, max: 50000 }),
    joinedAt: faker.date.past(),
  }));
};

export const generateDeliveries = (count: number, users: User[], couriers: Courier[]): Delivery[] => {
  return Array.from({ length: count }).map(() => ({
    id: `DEL-${faker.string.alphanumeric(6).toUpperCase()}`,
    userId: faker.helpers.arrayElement(users).id,
    courierId: faker.helpers.arrayElement(couriers).id,
    status: faker.helpers.arrayElement(['Completed', 'Completed', 'Completed', 'Failed', 'Cancelled', 'In Progress']),
    wEarned: faker.number.int({ min: 10, max: 100 }),
    date: faker.date.recent({ days: 30 }),
    pickupAddress: faker.location.streetAddress(),
    dropoffAddress: faker.location.streetAddress(),
  }));
};

export const generateLogs = (count: number): SystemLog[] => {
  return Array.from({ length: count }).map(() => ({
    id: faker.string.uuid(),
    action: faker.helpers.arrayElement(['Manual W Adjustment', 'User Suspension', 'Courier Flag', 'System Config Change']),
    details: faker.lorem.sentence(),
    adminId: 'ADMIN-001',
    timestamp: faker.date.recent({ days: 7 }),
  }));
};

// Initialize Mock Data Store
const users = generateUsers(50);
const couriers = generateCouriers(20);
const deliveries = generateDeliveries(200, users, couriers);
const logs = generateLogs(20);
const transactions: WTransaction[] = [];

export const mockData = {
  users,
  couriers,
  deliveries,
  logs,
  transactions,
};
