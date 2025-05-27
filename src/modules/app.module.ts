import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalModule } from './local.module';
import { OrderModule } from './order.module';
import { CapacityModule } from './capacity.module';
import ormConfig from 'src/infraestructure/config/ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(
     ormConfig
    ),
    LocalModule,
    OrderModule,
    CapacityModule,
  ],
})
export class AppModule {}