import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalService } from 'src/application/local/use-cases/local.service';
import { Local } from 'src/domain/local/entities/local.entity';
import { Order } from 'src/domain/order/entities/order.entity';
import { LocalController } from 'src/infraestructure/http/local.controller';
import { LocalRepository } from 'src/persistance/local/local.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Local, Order])],
  controllers: [LocalController],
  providers: [
    LocalService,
    {
      provide: 'ILocalRepository',
      useClass: LocalRepository,
    },
  ],
  exports: [
    LocalService,
    {
      provide: 'ILocalRepository',
      useClass: LocalRepository,
    },
  ],
})
export class LocalModule {}