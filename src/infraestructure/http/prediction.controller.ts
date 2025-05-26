import { Controller, Get, Query } from '@nestjs/common';
import { PredictionService } from '../../application/use-cases/prediction.service';

@Controller('prediction')
export class PredictionController {
  constructor(private readonly predictionService: PredictionService) {}

  @Get()
  async get(@Query('localId') localId: number, @Query('date') date: string) {
    return await this.predictionService.getPrediction(localId, date);
  }
}