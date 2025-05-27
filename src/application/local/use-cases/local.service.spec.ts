import { Test, TestingModule } from '@nestjs/testing';
import { LocalService } from './local.service';
import { Local } from 'src/domain/local/entities/local.entity';
import { Order } from 'src/domain/order/entities/order.entity';
import { NotFoundException } from '@nestjs/common';
import { ILocalRepository } from 'src/domain/local/interfaces/local-repository.interface';

const mockLocal: Local = {
  id: 1,
  name: 'Sucursal Central',
  address: 'Av. Siempre Viva 742',
  latitude: -31.4167,
  longitude: -64.1833,
  orders: [],
  capacities: [],
};

const mockOrders: Order[] = [
  { id: 1, date: new Date('2024-01-10'), quantity: 5, local: mockLocal },
  { id: 2, date: new Date('2024-01-11'), quantity: 12, local: mockLocal },
];

describe('LocalService', () => {
  let service: LocalService;
  let repo: jest.Mocked<ILocalRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocalService,
        {
          provide: 'ILocalRepository',
          useValue: {
            findAll: jest.fn().mockResolvedValue([mockLocal]),
            findById: jest.fn().mockResolvedValue(mockLocal),
            findOrders: jest.fn().mockResolvedValue(mockOrders),
          },
        },
      ],
    }).compile();

    service = module.get<LocalService>(LocalService);
    repo = module.get('ILocalRepository');
  });

  it('should return all locals', async () => {
    const locals: Local[] = [{ id: 1, name: 'Sucursal 1', address: '', latitude: 0, longitude: 0, orders: [], capacities: [] }];
    repo.findAll.mockResolvedValue(locals);
    
    const result = await service.findAll();
    expect(result).toEqual(locals);
    expect(repo.findAll).toHaveBeenCalled();
  });

  it('should return one local by id', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual(mockLocal);
  });

  it('should throw NotFoundException if local not found', async () => {
    repo.findById.mockResolvedValueOnce(null);
    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });

  it('should return orders for a local', async () => {
    const result = await service.findOrders(1);
    expect(result).toEqual(mockOrders);
  });
});
