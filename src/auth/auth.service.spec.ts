import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BcryptAdapter } from '../utils/src/adapters';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';
import { ConflictException, NotFoundException } from '@nestjs/common';

const userEntity = new User({ email: 'any_email', password: 'any_password' });
const password = '$2b$10$Th6JuLVLmI11G0eKasPMweQBjGt0waOwB8BTGmbcED/72VJHz/Xvm';

describe('AuthService', () => {
  let service: AuthService;
  let sutRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        BcryptAdapter,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn().mockResolvedValue(userEntity),
            create: jest.fn().mockResolvedValue(userEntity), 
            compareHash: jest.fn().mockResolvedValue(password),
            save: jest.fn().mockResolvedValue(userEntity), 
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    sutRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(sutRepository).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return a user entity successfully', async () => {
      const body: User = {
        id: 'any_id',
        email: 'any_email@mail.com',
        password: 'any_password',
        username: 'any',
        active: true,
        accounts: [],
        transactions: []
      };

      jest.spyOn(sutRepository, 'findOne').mockResolvedValue(null);

      const result = await service.create(body);
      expect(result).toEqual(userEntity);
    });

    it('should throw if user already exists', async () => {
      const body: User = {
        id: 'any_id',
        email: 'any_email@mail.com',
        password: 'any_password',
        username: 'any',
        active: true,
        accounts: [],
        transactions: []
      };

      jest.spyOn(sutRepository, 'findOne').mockResolvedValue(body);
      const result = service.create(body);
      
      expect(result).rejects.toThrowError(
        new ConflictException(`User already registered`),
      );
    });
  });

  describe('findOne', () => {
    it('should return a user entity successfully', async () => {
      const result = await service.findOne('any_email');
      expect(result).toEqual(userEntity);
    });

    it('should throw if an exception', async () => {
      jest.spyOn(sutRepository, 'findOne').mockRejectedValueOnce(new Error());
      expect(service.findOne('any_email')).rejects.toThrowError();
    });
  });
 
  describe('createHash', () => {
    it('should return a hash if successfully', async () => { 
      const result = await service.createHash("any_password"); 
      
      expect(result).not.toBeUndefined();
    }); 
  });

  describe('compareHash', () => {
    it('should return a true if successfully', async () => { 
      const result = await service.compareHash("any_password", password);  
      expect(result).toEqual(true);
    }); 

    it('should return if hear fails compare hash hear', async () => { 
      const result = service.compareHash("any_password_fail", password);  

      expect(result).rejects.toThrowError(
        new NotFoundException('invalid credentials'),
      );
    });
  });
});
