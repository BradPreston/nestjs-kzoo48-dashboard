import { Test, TestingModule } from '@nestjs/testing';
import { EntriesService } from './entries.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import { Entry } from '@prisma/client';
import { mockEntry, newEntry } from '../../test/mocks/entry.data';

describe('EntriesService', () => {
  let service: EntriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EntriesService, PrismaService],
    }).compile();

    service = module.get<EntriesService>(EntriesService);
  });

  it('service should be defined', async () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    let result: Entry;

    beforeEach(async () => {
      jest.spyOn(service, 'create').mockImplementation(async () => mockEntry);
      result = await service.create(newEntry);
    });

    it('should return an entry', async () => {
      expect(result).toEqual(mockEntry);
    });

    it('should have an id of 1', async () => {
      expect(result.id).toEqual(1);
    });
  });

  describe('findAll', () => {
    let result: Entry[];

    it('should have a length of 0', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([]);
      result = await service.findAll();
      expect(result).toHaveLength(0);
    });

    it('should have a length of 1', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([mockEntry]);
      result = await service.findAll();
      expect(result).toHaveLength(1);
    });
  });
});
