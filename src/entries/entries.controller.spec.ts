import { Test, TestingModule } from '@nestjs/testing';
import { EntriesController } from './entries.controller';
import { EntriesService } from './entries.service';
import { PrismaModule } from '../../src/prisma/prisma.module';
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

describe('EntriesController', () => {
  let controller: EntriesController;
  let service: EntriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntriesController],
      providers: [EntriesService],
      imports: [PrismaModule],
    }).compile();

    controller = module.get<EntriesController>(EntriesController);
    service = module.get<EntriesService>(EntriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('it creates an entry', async () => {
      jest
        .spyOn(controller, 'create')
        .mockImplementation(async () => mockEntry);
      await expect(controller.create(createEntryBad)).resolves.not.toThrow(
        BadRequestException,
      );
      expect(await controller.create(newEntry)).toBe(mockEntry);
    });

    it('should throw a BadRequestException with bad data', async () => {
      await expect(controller.create(createEntryBad)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findAll', () => {
    it('finds all entries', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue(mockResolvedEntryArray);
      expect(await controller.findAll()).toBe(mockResolvedEntryArray);
    });

    it('has a length of two entries', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue(mockResolvedEntryArray);
      expect(await controller.findAll()).toHaveLength(2);
    });

    it('has an entry with an id of 2', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue(mockResolvedEntryArray);
      const results = await controller.findAll();
      expect(results[1].id).toBe(2);
    });

    it('returns an empty array with no entries found', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([]);
      expect(await controller.findAll()).toStrictEqual([]);
    });
  });

  describe('findOne', () => {
    it('finds one entry by id', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockResolvedEntry);

      expect(await controller.findOne('1')).toBe(mockResolvedEntry);
    });

    it('throws a NotFoundException if entry is not found', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockRejectedValue(
          new NotFoundException('No entry with id "2" was found'),
        );

      await expect(controller.findOne('5')).rejects.toThrow(
        new NotFoundException('No entry with id "2" was found'),
      );
    });
  });

  describe('updatePatch', () => {
    it('returns an entry', async () => {
      jest.spyOn(service, 'update').mockResolvedValue(mockUpdatedEntry);

      expect(await controller.updatePatch('1', updateEntry)).toEqual(
        mockUpdatedEntry,
      );
    });

    it('should have different data after update', async () => {
      jest.spyOn(service, 'update').mockResolvedValue(mockUpdatedEntry);
      const result = await controller.updatePatch('1', updateEntry);

      expect(result.firstName).not.toEqual(mockEntry.firstName);
      expect(result.lastName).not.toEqual(mockEntry.lastName);
    });
  });

  describe('updatePut', () => {
    it('returns an entry', async () => {
      jest.spyOn(service, 'update').mockResolvedValue(mockUpdatedEntry);

      expect(await controller.updatePut('1', updateEntry)).toEqual(
        mockUpdatedEntry,
      );
    });

    it('should have different data after update', async () => {
      jest.spyOn(service, 'update').mockResolvedValue(mockUpdatedEntry);
      const result = await controller.updatePut('1', updateEntry);

      expect(result.firstName).not.toEqual(mockEntry.firstName);
      expect(result.lastName).not.toEqual(mockEntry.lastName);
    });
  });

  describe('remove', () => {
    it('returns the removed entry', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(mockEntry);
      const result = await controller.remove('1');
      expect(result).toBe(mockEntry);
    });

    it('should throw a NotFoundException if no entry is found', async () => {
      jest
        .spyOn(controller, 'remove')
        .mockRejectedValue(
          new NotFoundException('No entry with id "2" was found'),
        );
      await expect(controller.remove('2')).rejects.toThrow(
        new NotFoundException('No entry with id "2" was found'),
      );
    });
  });
});
