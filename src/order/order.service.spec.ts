import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';

describe('OrderService', () => {
  let service: OrderService;
  let orderRepository: Repository<Order>;

  beforeEach(async () => {
    const mockOrderRepository = {
      find: jest.fn().mockResolvedValue([]), // `find` metodu taklit ediliyor
      save: jest.fn().mockResolvedValue({}), // `save` metodu taklit ediliyor
      findOne: jest.fn().mockResolvedValue({}), // `findOne` metodu taklit ediliyor
      softDelete: jest.fn().mockResolvedValue({}), // `softDelete` metodu taklit ediliyor
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: getRepositoryToken(Order), // `Order` entitesi için repository'yi taklit ediyoruz
          useValue: mockOrderRepository, // Mock repository kullanıyoruz
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    orderRepository = module.get<Repository<Order>>(getRepositoryToken(Order));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should list all orders', async () => {
    const result = await service.list();
    expect(result).toEqual({ status: '200', order: [] });
    expect(orderRepository.find).toHaveBeenCalled();
  });
});
