import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/domain/entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
})
export class OrderModule {}
