import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IOrderRepository } from 'src/domain/order/interfaces/order-repository.interface';

@Injectable()
export class OrderService {
  constructor(
    @Inject('IOrderRepository')
    private readonly orderRepository: IOrderRepository
  ) {}

  async findAll() {
    return this.orderRepository.findAll();
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findById(id);
    if(!order) throw new NotFoundException('Order not found');
    return order;
  }
}