import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Local } from 'src/domain/entities/local.entity';
import { LocalService } from 'src/application/use-cases/local.service';
import { LocalController } from 'src/infraestructure/http/local.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Local])],
  controllers: [LocalController],
  providers: [LocalService],
})
export class LocalModule {}