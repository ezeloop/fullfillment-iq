import { Test, TestingModule } from '@nestjs/testing';
import { CapacityService } from './capacity.service';
import { ICapacityRepository } from 'src/domain/capacity/interfaces/capacity-repository.interface';
import { Capacity } from '../../../domain/capacity/entities/capacity.entity';
import { NotFoundException } from '@nestjs/common';

describe('CapacityService', () => {
  let service: CapacityService;
  let repo: jest.Mocked<ICapacityRepository>;

  beforeEach(async () => {
    const mockRepo: Partial<ICapacityRepository> = {
      findByDateAndLocal: jest.fn(),
      findAllByLocal: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CapacityService,
        {
          provide: 'ICapacityRepository',
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<CapacityService>(CapacityService);
    repo = module.get('ICapacityRepository');
  });

  it('should return capacity if it exists', async () => {
    const mockCapacity = new Capacity();
    mockCapacity.capacity = 10;
    repo.findByDateAndLocal.mockResolvedValue(mockCapacity);

    const result = await service.getCapacity(1, new Date('2024-01-10'));

    expect(result).toBe(mockCapacity);
    expect(repo.findByDateAndLocal).toHaveBeenCalledWith(
      new Date('2024-01-10'),
      1,
    );
  });

  it('should throw NotFoundException if capacity does not exist', async () => {
    repo.findByDateAndLocal.mockResolvedValue(null);

    await expect(
      service.getCapacity(1, new Date('2024-01-10')),
    ).rejects.toThrow(NotFoundException);
  });
});
