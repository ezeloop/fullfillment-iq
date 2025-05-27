import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ILocalRepository } from 'src/domain/local/interfaces/local-repository.interface';

@Injectable()
export class LocalService {
  constructor(
  @Inject('ILocalRepository')
  private readonly localRepository: ILocalRepository
) {}

  findAll() {
    return this.localRepository.findAll();
  }

  async findOne(id: number) {
    const local = await this.localRepository.findById(id);
    if (!local) throw new NotFoundException('Local not found');
    return local;
  }

  async findOrders(id: number) {
    const orders = await this.localRepository.findOrders(id);
    return orders;
  }
}