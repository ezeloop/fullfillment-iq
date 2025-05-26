import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalModule } from './local.module';
import { OrderModule } from './order.module';
import { PredictionModule } from './prediction.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'fullfill_iq_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    LocalModule,
    OrderModule,
    PredictionModule,
  ],
})
export class AppModule {}