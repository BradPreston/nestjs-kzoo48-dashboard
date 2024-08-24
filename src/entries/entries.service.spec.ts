import { Test, TestingModule } from '@nestjs/testing';
import { EntriesService } from './entries.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import { Entry } from '@prisma/client';
import {
  mockEntries,
  mockEntry,
  mockUpdatedEntry,
  newEntry,
  updateEntry,
} from '../../test/mocks/entry.data';

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
    it('should have a length of 0 with no entries', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([]);
      const result = await service.findAll();
      expect(result).toHaveLength(0);
    });

    it('should have a length of 1', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([mockEntry]);
      const result = await service.findAll();
      expect(result).toHaveLength(1);
    });

    it('should contain an entry with an id of 1', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([mockEntry]);
      const result = await service.findAll();
      expect(result[0].id).toBe(1);
    });

    it('should have a length of 2', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue(mockEntries);
      const result = await service.findAll();
      expect(result).toHaveLength(2);
    });

    it('should contain an entry with an id of 2', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue(mockEntries);
      const result = await service.findAll();
      expect(result[1].id).toBe(2);
    });
  });

  describe('findOne', () => {
    it('should find an entry', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockEntry);
      const result = await service.findOne(1);
      expect(result).toEqual(mockEntry);
    });

    it('should have an id of 1', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockEntry);
      const result = await service.findOne(1);
      expect(result.id).toBe(1);
    });
  });

  describe('update', () => {
    let result: Entry;

    beforeEach(async () => {
      jest
        .spyOn(service, 'update')
        .mockImplementationOnce(async () => mockUpdatedEntry);
      result = await service.update(1, updateEntry);
    });

    it('should return an entry', async () => {
      expect(result).toEqual(mockUpdatedEntry);
    });

    it('should have different data after update', async () => {
      expect(result.firstName).not.toEqual(mockEntry.firstName);
      expect(result.lastName).not.toEqual(mockEntry.lastName);
    });
  });

  describe('remove', () => {
    it('returns the removed entry', async () => {
      jest.spyOn(service, 'remove').mockImplementation(async () => mockEntry);
      const result = await service.remove(1);
      expect(result).toBe(mockEntry);
    });

    it('has a length of 1 after removal', async () => {
      jest
        .spyOn(service, 'findAll')
        .mockResolvedValueOnce(mockEntries.filter((entry) => entry.id !== 1));
      jest.spyOn(service, 'remove').mockImplementation(async () => mockEntry);

      const remainingEntries = await service.findAll();
      const result = await service.remove(1);

      expect(service.remove).toHaveBeenCalled();
      expect(service.findAll).toHaveBeenCalled();
      expect(remainingEntries).not.toContain(result);
      expect(remainingEntries).toHaveLength(1);
    });
  });
});
