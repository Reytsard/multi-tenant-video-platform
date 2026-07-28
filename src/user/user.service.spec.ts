import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { ModuleMocker } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

describe('UserService', () => {
  const moduleRef = Test.createTestingModule({
    providers: [UserService],
  });

  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
