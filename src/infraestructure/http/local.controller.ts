import { Controller, Get, Param } from '@nestjs/common';
import { LocalService } from '../../application/local/use-cases/local.service';

@Controller('stores')
export class LocalController {
  constructor(private readonly localService: LocalService) {}

  @Get()
  findAll() {
    return this.localService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.localService.findOne(+id);
  }

  @Get(':id/orders')
  findOrders(@Param('id') id: string) {
    return this.localService.findOrders(+id);
  }
}