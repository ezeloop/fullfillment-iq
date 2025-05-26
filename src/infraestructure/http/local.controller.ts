import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Local } from '../../domain/entities/local.entity';

@Controller('local')
export class LocalController {
  constructor(
    @InjectRepository(Local)
    private readonly repo: Repository<Local>,
  ) {}

  @Get()
  async getAll() {
    return await this.repo.find();
  }
}