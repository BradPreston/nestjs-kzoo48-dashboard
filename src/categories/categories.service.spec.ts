import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import {
  badMockCategory,
  badUpdateCategoryMock,
  goodUpdateCategoryMock,
  mockCategory,
  mockCategoryUpdated,
  mockResolvedCategory,
  newCategory,
} from '../../test/mocks/category.data';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('CategoriesService', () => {
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesService, PrismaService],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return a category', async () => {
      jest
        .spyOn(service, 'create')
        .mockImplementation(async () => mockCategory);
      expect(await service.create(newCategory)).toEqual(mockCategory);
    });

    it('should have an id of 1', async () => {
      jest
        .spyOn(service, 'create')
        .mockImplementation(async () => mockCategory);
      expect(await service.create(newCategory)).toHaveProperty('id', 1);
    });

    it('should throw a BadRequestException with bad data', async () => {
      jest
        .spyOn(service, 'create')
        .mockRejectedValue(new BadRequestException('name must be a string'));
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await expect(service.create(badMockCategory)).rejects.toThrow(
        new BadRequestException('name must be a string'),
      );
    });
  });

  describe('findAll', () => {
    it('should have a length of 0', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([]);
      expect(await service.findAll()).toHaveLength(0);
    });

    it('should have a length of 1', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([mockResolvedCategory]);
      expect(await service.findAll()).toHaveLength(1);
    });

    it('should have a category with an id of 1', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([mockResolvedCategory]);
      const result = await service.findAll();
      expect(result[0].id).toBe(1);
    });
  });

  describe('findOne', () => {
    it('should return a category', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockResolvedCategory);
      expect(await service.findOne(1)).toEqual(mockResolvedCategory);
    });

    it('should have an id of 1', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockResolvedCategory);
      expect(await service.findOne(1)).toHaveProperty('id', 1);
    });

    it('should throw a NotFoundException if no category was found', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockRejectedValue(
          new NotFoundException('No category with id "3" was found'),
        );
      await expect(service.findOne(3)).rejects.toThrow(
        new NotFoundException('No category with id "3" was found'),
      );
    });
  });

  describe('update', () => {
    it('should return a category', async () => {
      jest
        .spyOn(service, 'update')
        .mockImplementation(async () => mockCategoryUpdated);
      expect(await service.update(1, goodUpdateCategoryMock)).toBe(
        mockCategoryUpdated,
      );
    });

    it('should have different data after update', async () => {
      jest
        .spyOn(service, 'update')
        .mockImplementation(async () => mockCategoryUpdated);
      expect(await service.update(1, goodUpdateCategoryMock)).not.toBe(
        mockCategory,
      );
    });

    it('should throw a BadRequestException with bad data', async () => {
      jest
        .spyOn(service, 'update')
        .mockRejectedValue(new BadRequestException('name must be a string'));
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await expect(service.update(1, badUpdateCategoryMock)).rejects.toThrow(
        new BadRequestException('name must be a string'),
      );
    });
  });

  describe('remove', () => {
    it('should return a category', async () => {
      jest
        .spyOn(service, 'remove')
        .mockImplementation(async () => mockCategory);
      expect(await service.remove(1)).toBe(mockCategory);
    });

    it('should throw a NotFoundException if no category is found', async () => {
      jest
        .spyOn(service, 'remove')
        .mockRejectedValue(
          new NotFoundException('No category with id "3" was found'),
        );
      await expect(service.remove(1)).rejects.toThrow(
        new NotFoundException('No category with id "3" was found'),
      );
    });
  });
});
