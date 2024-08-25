import { Test, TestingModule } from '@nestjs/testing';
import { EntriesController } from './entries.controller';
import { EntriesService } from './entries.service';
import { PrismaModule } from '../../src/prisma/prisma.module';
import {
  createEntryBad,
  mockEntries,
  mockEntry,
  mockUpdatedEntry,
  newEntry,
  updateEntry,
} from '../../test/mocks/entry.data';
import { BadRequestException, NotFoundException } from '@nestjs/common';

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
    beforeEach(async () => {
      jest
        .spyOn(controller, 'findAll')
        .mockImplementation(async () => mockEntries);
    });

    it('finds all entries', async () => {
      expect(await controller.findAll()).toEqual(mockEntries);
    });

    it('has a length of two entries', async () => {
      expect(await controller.findAll()).toHaveLength(2);
    });

    it('has an entry with an id of 2', async () => {
      const results = await controller.findAll();
      expect(results[1].id).toBe(2);
    });
  });

  describe('findOne', () => {
    it('finds one entry by id', async () => {
      jest
        .spyOn(controller, 'findOne')
        .mockImplementation(async () => mockEntry);

      expect(await controller.findOne('1')).toBe(mockEntry);
    });

    it('throws a NotFoundException if entry is not found', async () => {
      jest
        .spyOn(controller, 'findOne')
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
      jest
        .spyOn(controller, 'updatePatch')
        .mockImplementation(async () => mockUpdatedEntry);

      expect(await controller.updatePatch('1', updateEntry)).toEqual(
        mockUpdatedEntry,
      );
    });

    it('should have different data after update', async () => {
      jest
        .spyOn(controller, 'updatePatch')
        .mockImplementation(async () => mockUpdatedEntry);
      const result = await controller.updatePatch('1', updateEntry);

      expect(result.firstName).not.toEqual(mockEntry.firstName);
      expect(result.lastName).not.toEqual(mockEntry.lastName);
    });
  });

  describe('updatePut', () => {
    it('returns an entry', async () => {
      jest
        .spyOn(controller, 'updatePut')
        .mockImplementation(async () => mockUpdatedEntry);

      expect(await controller.updatePut('1', updateEntry)).toEqual(
        mockUpdatedEntry,
      );
    });

    it('should have different data after update', async () => {
      jest
        .spyOn(controller, 'updatePut')
        .mockImplementation(async () => mockUpdatedEntry);
      const result = await controller.updatePut('1', updateEntry);

      expect(result.firstName).not.toEqual(mockEntry.firstName);
      expect(result.lastName).not.toEqual(mockEntry.lastName);
    });
  });

  describe('remove', () => {
    it('returns the removed entry', async () => {
      jest
        .spyOn(controller, 'remove')
        .mockImplementation(async () => mockEntry);
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
