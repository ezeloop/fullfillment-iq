import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../../domain/entities/order.entity';

@Injectable()
export class PredictionService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
  ) {}

  async getPrediction(localId: number, date: string) {
    const orders = await this.orderRepo.find({
      where: { local: { id: localId } },
    });

    const totalOrders = orders.length;
    const averageOrders = totalOrders / (orders.length || 1);

    return {
      localId,
      date,
      expectedOrders: Math.round(averageOrders),
    };
  }
}