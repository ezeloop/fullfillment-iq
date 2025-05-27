import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Capacity } from 'src/domain/capacity/entities/capacity.entity';
import { CapacityService } from 'src/application/capacity/use-cases/capacity.service';
import { CapacityController } from 'src/infraestructure/http/capacity.controller';
import { CapacityRepository } from 'src/persistance/capacity/capacity.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Capacity])],
  controllers: [CapacityController],
  providers: [
    CapacityService,
    {
      provide: 'ICapacityRepository',
      useClass: CapacityRepository,
    },
  ],
  exports: [CapacityService, 'ICapacityRepository'],
})
export class CapacityModule {}
