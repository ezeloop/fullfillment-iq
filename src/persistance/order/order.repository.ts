import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "src/domain/order/entities/order.entity";
import { IOrderRepository } from "src/domain/order/interfaces/order-repository.interface";
import { Repository } from "typeorm";

@Injectable()
export class OrderRepository implements IOrderRepository {
    constructor(
        @InjectRepository(Order)
        private readonly repo: Repository<Order>,
    ) {}

    async findAll(): Promise<Order[]> {
        return this.repo.find({ relations: ['local'] });
    }

    async findById(id: number): Promise<Order | null> {
        return this.repo.findOne({ where: { id }, relations: ['local'] });
    }

    async save(order: Order): Promise<Order> {
        return this.repo.save(order);
    }

    async delete(id: number): Promise<void> {
        await this.repo.delete(id);
    }

}
