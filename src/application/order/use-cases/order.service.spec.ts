import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { IOrderRepository } from '../../../domain/order/interfaces/order-repository.interface';
import { Order } from 'src/domain/order/entities/order.entity';
import { Local } from 'src/domain/local/entities/local.entity';
import { NotFoundException } from '@nestjs/common';

describe('OrderService', () => {
  let service: OrderService;
  let repo: jest.Mocked<IOrderRepository>;

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
    {
      id: 1,
      date: new Date('2024-01-10'),
      quantity: 5,
      local: mockLocal,
    },
    {
      id: 2,
      date: new Date('2024-01-11'),
      quantity: 12,
      local: mockLocal,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: 'IOrderRepository',
          useValue: {
            findAll: jest.fn().mockResolvedValue(mockOrders),
            findById: jest.fn().mockResolvedValue(mockOrders[0]),
          },
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    repo = module.get('IOrderRepository');
  });

  it('should return all orders', async () => {
    const result = await service.findAll();
    expect(result).toEqual(mockOrders);
    expect(repo.findAll).toHaveBeenCalled();
  });

  it('should return one order by id', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual(mockOrders[0]);
    expect(repo.findById).toHaveBeenCalledWith(1);
  });

  it('should throw NotFoundException if order not found', async () => {
    repo.findById.mockResolvedValueOnce(null);
    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });
});
