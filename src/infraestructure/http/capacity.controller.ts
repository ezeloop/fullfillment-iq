import { Controller, Get, Param, Query, Post, Body, ParseIntPipe } from '@nestjs/common';
import { CapacityService } from 'src/application/capacity/use-cases/capacity.service';
import { Capacity } from 'src/domain/capacity/entities/capacity.entity';

@Controller('capacities')
export class CapacityController {
  constructor(private readonly capacityService: CapacityService) {}

  @Get(':localId')
  async list(@Param('localId') localId: number): Promise<Capacity[]> {
    return this.capacityService.listCapacities(localId);
  }

  @Get()
  async getByDate(
    @Query('localId') localId: number,
    @Query('date') date: string,
  ): Promise<Capacity> {
    return this.capacityService.getCapacity(localId, new Date(date));
  }

  @Post()
  async save(@Body() capacity: Capacity): Promise<Capacity> {
    return this.capacityService.createOrUpdate(capacity);
  }

   @Get(':localId/:date')
  async getCapacity(
    @Param('localId', ParseIntPipe) localId: number,
    @Param('date') date: string,
  ) {
    const parsedDate = new Date(date);
    return this.capacityService.getCapacity(localId, parsedDate);
  }
}
