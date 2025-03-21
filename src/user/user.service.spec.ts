import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm'; // getRepositoryToken kullanarak repository'yi taklit etmek için
import { Users } from './entities/user.entity'; // Users entity'si
import { Repository } from 'typeorm';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<Users>;

  beforeEach(async () => {
    const mockUserRepository = {
      find: jest.fn().mockResolvedValue([]), // `find` metodu taklit ediliyor
      save: jest.fn().mockResolvedValue({}),  // `save` metodu taklit ediliyor
      findOne: jest.fn().mockResolvedValue({}), // `findOne` metodu taklit ediliyor
      softDelete: jest.fn().mockResolvedValue({}), // `softDelete` metodu taklit ediliyor
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(Users), // `Users` entitesi için repository'yi taklit ediyoruz
          useValue: mockUserRepository, // Mock repository kullanıyoruz
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<Users>>(getRepositoryToken(Users));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should list all users', async () => {
    const result = await service.list();
    expect(result).toEqual({ status: '201', user: [] });
    expect(userRepository.find).toHaveBeenCalled();
  });
 
});
