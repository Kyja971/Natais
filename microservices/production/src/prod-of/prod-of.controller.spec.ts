import { Test, TestingModule } from '@nestjs/testing';
import { ProdOfController } from './prod-of.controller';
import { ProdOfService } from './prod-of.service';

describe('ProdOfController', () => {
  let controller: ProdOfController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdOfController],
      providers: [ProdOfService],
    }).compile();

    controller = module.get<ProdOfController>(ProdOfController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
