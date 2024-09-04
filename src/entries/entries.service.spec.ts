import { Test, TestingModule } from '@nestjs/testing';
import { EntriesService } from './entries.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import { Entry } from '@prisma/client';
import {
  createEntryBad,
  mockEntry,
  mockResolvedEntry,
  mockResolvedEntryArray,
  mockUpdatedEntry,
  newEntry,
  updateEntry,
} from '../../test/mocks/entry.data';
import { BadRequestException, NotFoundException } from '@nestjs/common';

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
    it('should return an entry', async () => {
      jest.spyOn(service, 'create').mockImplementation(async () => mockEntry);
      await expect(service.create(newEntry)).resolves.toEqual(mockEntry);
    });

    it('should have an id of 1', async () => {
      jest.spyOn(service, 'create').mockImplementation(async () => mockEntry);
      await expect(service.create(newEntry)).resolves.toHaveProperty('id', 1);
    });

    it('should throw a BadRequestException', async () => {
      await expect(service.create(createEntryBad)).rejects.toThrow(
        new BadRequestException('firstName must be a string'),
      );
    });
  });

  describe('findAll', () => {
    it('should have a length of 0 with no entries', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([]);
      await expect(service.findAll()).resolves.toHaveLength(0);
    });

    it('should have a length of 1', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([mockResolvedEntry]);
      await expect(service.findAll()).resolves.toHaveLength(1);
    });

    it('should contain an entry with an id of 1', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue(mockResolvedEntryArray);
      const result = await service.findAll();
      expect(result[0].id).toBe(1);
    });

    it('should have a length of 2', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue(mockResolvedEntryArray);
      await expect(service.findAll()).resolves.toHaveLength(2);
    });

    it('should contain an entry with an id of 2', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue(mockResolvedEntryArray);
      const result = await service.findAll();
      expect(result[1].id).toBe(2);
    });
  });

  describe('findOne', () => {
    it('should find an entry', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockResolvedEntry);
      expect(await service.findOne(1)).toEqual(mockResolvedEntry);
    });

    it('should have an id of 1', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockResolvedEntry);
      const result = await service.findOne(1);
      expect(result.id).toBe(1);
    });

    it('should throw a NotFoundException if no entry is found', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockRejectedValue(
          new NotFoundException('No entry with id "2" was found'),
        );
      await expect(service.findOne(2)).rejects.toThrow(
        new NotFoundException('No entry with id "2" was found'),
      );
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
      expect(await service.remove(1)).toBe(mockEntry);
    });

    it('has a length of 1 after removal', async () => {
      jest
        .spyOn(service, 'findAll')
        .mockResolvedValueOnce(
          mockResolvedEntryArray.filter((entry) => entry.id !== 1),
        );
      jest.spyOn(service, 'remove').mockImplementation(async () => mockEntry);

      const remainingEntries = await service.findAll();
      const result = await service.remove(1);

      expect(service.remove).toHaveBeenCalled();
      expect(service.findAll).toHaveBeenCalled();
      expect(remainingEntries).not.toContain(result);
      expect(remainingEntries).toHaveLength(1);
    });

    it('should throw a NotFoundException if no entry is found', async () => {
      jest
        .spyOn(service, 'remove')
        .mockRejectedValue(
          new NotFoundException('No entry with id "2" was found'),
        );
      await expect(service.remove(2)).rejects.toThrow(
        new NotFoundException('No entry with id "2" was found'),
      );
    });
  });
});
