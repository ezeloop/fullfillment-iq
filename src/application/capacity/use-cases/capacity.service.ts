import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Capacity } from 'src/domain/capacity/entities/capacity.entity';
import { ICapacityRepository } from 'src/domain/capacity/interfaces/capacity-repository.interface';

@Injectable()
export class CapacityService {
  constructor(
    @Inject('ICapacityRepository')
    private readonly capacityRepo: ICapacityRepository
) {}

  async getCapacity(localId: number, date: Date): Promise<Capacity> {
    const capacity = await this.capacityRepo.findByDateAndLocal(date, localId);
    if (!capacity) throw new NotFoundException('Capacity not found');
    return capacity;
  }

  async listCapacities(localId: number): Promise<Capacity[]> {
    return this.capacityRepo.findAllByLocal(localId);
  }

  async createOrUpdate(capacity: Capacity): Promise<Capacity> {
    return this.capacityRepo.save(capacity);
  }
}
