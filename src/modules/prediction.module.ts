import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PredictionService } from 'src/application/use-cases/prediction.service';
import { Order } from 'src/domain/entities/order.entity';
import { PredictionController } from 'src/infraestructure/http/prediction.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [PredictionController],
  providers: [PredictionService],
})
export class PredictionModule {}