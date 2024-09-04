import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import {
  goodUpdateCategoryMock,
  badUpdateCategoryMock,
  badMockCategory,
  mockCategory,
  mockCategoryUpdated,
  newCategory,
  mockResolvedCategory,
} from '../../test/mocks/category.data';
import { PrismaModule } from '../../src/prisma/prisma.module';

describe('CategoriesController', () => {
  let controller: CategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [CategoriesService],
      imports: [PrismaModule],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should return a category', async () => {
      jest
        .spyOn(controller, 'create')
        .mockImplementation(async () => mockCategory);
      expect(await controller.create(newCategory)).toEqual(mockCategory);
    });

    it('should have an id of 1', async () => {
      jest
        .spyOn(controller, 'create')
        .mockImplementation(async () => mockCategory);
      expect(await controller.create(newCategory)).toHaveProperty('id', 1);
    });

    it('should throw a BadRequestException with bad data', async () => {
      jest
        .spyOn(controller, 'create')
        .mockRejectedValue(new BadRequestException('name must be a string'));
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await expect(controller.create(badMockCategory)).rejects.toThrow(
        new BadRequestException('name must be a string'),
      );
    });
  });

  describe('findAll', () => {
    it('should have a length of 0', async () => {
      jest.spyOn(controller, 'findAll').mockResolvedValue([]);
      expect(await controller.findAll()).toHaveLength(0);
    });

    it('should have a length of 1', async () => {
      jest
        .spyOn(controller, 'findAll')
        .mockResolvedValue([mockResolvedCategory]);
      expect(await controller.findAll()).toHaveLength(1);
    });

    it('should have a category with an id of 1', async () => {
      jest
        .spyOn(controller, 'findAll')
        .mockResolvedValue([mockResolvedCategory]);
      const result = await controller.findAll();
      expect(result[0].id).toBe(1);
    });
  });

  describe('findOne', () => {
    it('should return a category', async () => {
      jest.spyOn(controller, 'findOne').mockResolvedValue(mockResolvedCategory);
      expect(await controller.findOne('1')).toEqual(mockResolvedCategory);
    });

    it('should have an id of 1', async () => {
      jest.spyOn(controller, 'findOne').mockResolvedValue(mockResolvedCategory);
      expect(await controller.findOne('1')).toHaveProperty('id', 1);
    });

    it('should throw a NotFoundException if no category was found', async () => {
      jest
        .spyOn(controller, 'findOne')
        .mockRejectedValue(
          new NotFoundException('No category with id "3" was found'),
        );
      await expect(controller.findOne('3')).rejects.toThrow(
        new NotFoundException('No category with id "3" was found'),
      );
    });
  });

  describe('updatePatch', () => {
    it('should return a category', async () => {
      jest
        .spyOn(controller, 'updatePatch')
        .mockImplementation(async () => mockCategoryUpdated);
      expect(await controller.updatePatch('1', goodUpdateCategoryMock)).toBe(
        mockCategoryUpdated,
      );
    });

    it('should have different data after update', async () => {
      jest
        .spyOn(controller, 'updatePatch')
        .mockImplementation(async () => mockCategoryUpdated);
      expect(
        await controller.updatePatch('1', goodUpdateCategoryMock),
      ).not.toBe(mockCategory);
    });

    it('should throw a BadRequestException with bad data', async () => {
      jest
        .spyOn(controller, 'updatePatch')
        .mockRejectedValue(new BadRequestException('name must be a string'));

      await expect(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        controller.updatePatch('1', badUpdateCategoryMock),
      ).rejects.toThrow(new BadRequestException('name must be a string'));
    });
  });

  describe('updatePut', () => {
    it('should return a category', async () => {
      jest
        .spyOn(controller, 'updatePut')
        .mockImplementation(async () => mockCategoryUpdated);
      expect(await controller.updatePut('1', goodUpdateCategoryMock)).toBe(
        mockCategoryUpdated,
      );
    });

    it('should have different data after update', async () => {
      jest
        .spyOn(controller, 'updatePut')
        .mockImplementation(async () => mockCategoryUpdated);
      expect(await controller.updatePut('1', goodUpdateCategoryMock)).not.toBe(
        mockCategory,
      );
    });

    it('should throw a BadRequestException with bad data', async () => {
      jest
        .spyOn(controller, 'updatePut')
        .mockRejectedValue(new BadRequestException('name must be a string'));

      await expect(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        controller.updatePut('1', badUpdateCategoryMock),
      ).rejects.toThrow(new BadRequestException('name must be a string'));
    });
  });

  describe('remove', () => {
    it('should return a category', async () => {
      jest
        .spyOn(controller, 'remove')
        .mockImplementation(async () => mockCategory);
      expect(await controller.remove('1')).toBe(mockCategory);
    });

    it('should throw a NotFoundException if no category is found', async () => {
      jest
        .spyOn(controller, 'remove')
        .mockRejectedValue(
          new NotFoundException('No category with id "3" was found'),
        );
      await expect(controller.remove('1')).rejects.toThrow(
        new NotFoundException('No category with id "3" was found'),
      );
    });
  });
});
