import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/domain/order/entities/order.entity';
import { OrderService } from '../application/order/use-cases/order.service';
import { OrderController } from '../infraestructure/http/order.controller';
import { OrderRepository } from 'src/persistance/order/order.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrderController],
  providers: [
    OrderService,
    {
      provide: 'IOrderRepository',
      useClass: OrderRepository,
    },
  ],
  exports: [OrderService],
})
export class OrderModule {}
