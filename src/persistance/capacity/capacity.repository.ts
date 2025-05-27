import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Capacity } from 'src/domain/capacity/entities/capacity.entity';
import { ICapacityRepository } from 'src/domain/capacity/interfaces/capacity-repository.interface';
import { Repository } from 'typeorm';

@Injectable()
export class CapacityRepository implements ICapacityRepository {
  constructor(
    @InjectRepository(Capacity)
    private readonly repo: Repository<Capacity>,
  ) {}

  async findByDateAndLocal(date: Date, localId: number): Promise<Capacity | null> {
    return this.repo.findOne({
      where: {
        date,
        local: { id: localId },
      },
      relations: ['local'],
    });
  }

  async save(capacity: Capacity): Promise<Capacity> {
    return this.repo.save(capacity);
  }

  async findAllByLocal(localId: number): Promise<Capacity[]> {
    return this.repo.find({
      where: {
        local: { id: localId },
      },
      relations: ['local'],
    });
  }

  async update(capacity: Capacity): Promise<Capacity> {
    return this.repo.save(capacity);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
