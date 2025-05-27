import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Local } from '../../domain/local/entities/local.entity';
import { Order } from '../../domain/order/entities/order.entity';
import { ILocalRepository } from 'src/domain/local/interfaces/local-repository.interface';

@Injectable()
export class LocalRepository implements ILocalRepository {
  constructor(
    @InjectRepository(Local)
    private readonly repo: Repository<Local>,
  ) {}

  async findAll(): Promise<Local[]> {
    return this.repo.find({ relations: ['orders'] });
  }

  async findById(id: number): Promise<Local | null> {
    return this.repo.findOne({ where: { id }, relations: ['orders'] });
  }

  async save(local: Local): Promise<Local> {
    return this.repo.save(local);
  }

  async findOrders(id: number): Promise<Order[]> {
    const local = await this.repo.findOne({
      where: { id },
      relations: ['orders'],
    });
    return local?.orders ?? [];
  }
}
