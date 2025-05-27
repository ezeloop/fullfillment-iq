import { Capacity } from 'src/domain/capacity/entities/capacity.entity';

export interface ICapacityRepository {
  findByDateAndLocal(date: Date, localId: number): Promise<Capacity | null>;
  save(capacity: Capacity): Promise<Capacity>;
  findAllByLocal(localId: number): Promise<Capacity[]>;
  update(capacity: Capacity): Promise<Capacity>;
  delete(id: number): Promise<void>;
}
