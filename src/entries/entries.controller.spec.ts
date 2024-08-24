import { Test, TestingModule } from '@nestjs/testing';
import { EntriesController } from './entries.controller';
import { EntriesService } from './entries.service';
import { PrismaModule } from '../../src/prisma/prisma.module';

describe('EntriesController', () => {
  let controller: EntriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntriesController],
      providers: [EntriesService],
      imports: [PrismaModule],
    }).compile();

    controller = module.get<EntriesController>(EntriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
