import { Order } from '../entities/order.entity';

export interface IOrderRepository {
  findAll(): Promise<Order[]>;
  findById(id: number): Promise<Order | null>;
  save(order: Order): Promise<Order>;
  delete(id: number): Promise<void>;
}