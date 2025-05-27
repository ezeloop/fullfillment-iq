import { Local } from '../entities/local.entity';

export interface ILocalRepository {
  findAll(): Promise<Local[]>;
  findById(id: number): Promise<Local | null>;
  save(local: Local): Promise<Local>;
  findOrders(id: number): Promise<Local['orders']>;
}