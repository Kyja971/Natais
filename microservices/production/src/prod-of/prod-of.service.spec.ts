import { Test, TestingModule } from '@nestjs/testing';
import { ProdOfService } from './prod-of.service';

describe('ProdOfService', () => {
  let service: ProdOfService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProdOfService],
    }).compile();

    service = module.get<ProdOfService>(ProdOfService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
