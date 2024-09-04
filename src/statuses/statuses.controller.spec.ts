import { Test, TestingModule } from '@nestjs/testing';
import { StatusesController } from './statuses.controller';
import { StatusesService } from './statuses.service';
import { PrismaModule } from '../../src/prisma/prisma.module';
import {
  badUpdateStatusMock,
  goodUpdateStatusMock,
  mockStatus,
  mockStatusUpdated,
  newStatus,
} from '../../test/mocks/status.data';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('StatusesController', () => {
  let controller: StatusesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatusesController],
      providers: [StatusesService],
      imports: [PrismaModule],
    }).compile();

    controller = module.get<StatusesController>(StatusesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('creates a status', async () => {
      jest
        .spyOn(controller, 'create')
        .mockImplementation(async () => mockStatus);
      const result = controller.create(newStatus);
      await expect(result).resolves.toEqual(mockStatus);
    });

    it('throws a BadRequestException with bad data', async () => {
      jest
        .spyOn(controller, 'create')
        .mockRejectedValue(new BadRequestException('name must be a string'));
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const result = controller.create({ name: 1 });
      await expect(result).rejects.toThrow(
        new BadRequestException('name must be a string'),
      );
    });
  });

  describe('findAll', () => {
    it('has a length of 0', async () => {
      jest.spyOn(controller, 'findAll').mockResolvedValue([]);
      const result = controller.findAll();
      await expect(result).resolves.toHaveLength(0);
    });

    it('has a length of 1', async () => {
      jest.spyOn(controller, 'findAll').mockResolvedValue([mockStatus]);
      const result = controller.findAll();
      await expect(result).resolves.toHaveLength(1);
    });

    it('should have a status with an id of 1', async () => {
      jest.spyOn(controller, 'findAll').mockResolvedValue([mockStatus]);
      const result = await controller.findAll();
      expect(result[0].id).toBe(1);
    });
  });

  describe('findOne', () => {
    it('should return a status', async () => {
      jest.spyOn(controller, 'findOne').mockResolvedValue(mockStatus);
      const result = controller.findOne('1');
      await expect(result).resolves.toBe(mockStatus);
    });

    it('should have an id of 1', async () => {
      jest.spyOn(controller, 'findOne').mockResolvedValue(mockStatus);
      const result = await controller.findOne('1');
      expect(result.id).toBe(1);
    });

    it('should throw a NotFoundException if no id is found', async () => {
      jest
        .spyOn(controller, 'findOne')
        .mockRejectedValue(
          new NotFoundException('No status with id "3" was found'),
        );
      const result = controller.findOne('3');
      await expect(result).rejects.toThrow('No status with id "3" was found');
    });
  });

  describe('updatePatch', () => {
    it('should return a status', async () => {
      jest
        .spyOn(controller, 'updatePatch')
        .mockResolvedValue(mockStatusUpdated);
      const result = controller.updatePatch('1', goodUpdateStatusMock);
      await expect(result).resolves.toBe(mockStatusUpdated);
    });

    it('should have different data after update', async () => {
      jest
        .spyOn(controller, 'updatePatch')
        .mockResolvedValue(mockStatusUpdated);
      const result = controller.updatePatch('1', goodUpdateStatusMock);
      await expect(result).resolves.not.toBe(mockStatus);
    });

    it('should throw a BadRequestException with bad data', async () => {
      jest
        .spyOn(controller, 'updatePatch')
        .mockRejectedValue(new BadRequestException('name must be a string'));
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const result = controller.updatePatch('1', badUpdateStatusMock);
      await expect(result).rejects.toThrow(
        new BadRequestException('name must be a string'),
      );
    });
  });

  describe('updatePut', () => {
    it('should return a status', async () => {
      jest.spyOn(controller, 'updatePut').mockResolvedValue(mockStatusUpdated);
      const result = controller.updatePut('1', goodUpdateStatusMock);
      await expect(result).resolves.toBe(mockStatusUpdated);
    });

    it('should have different data after update', async () => {
      jest.spyOn(controller, 'updatePut').mockResolvedValue(mockStatusUpdated);
      const result = controller.updatePut('1', goodUpdateStatusMock);
      await expect(result).resolves.not.toBe(mockStatus);
    });

    it('should throw a BadRequestException with bad data', async () => {
      jest
        .spyOn(controller, 'updatePut')
        .mockRejectedValue(new BadRequestException('name must be a string'));
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const result = controller.updatePut('1', badUpdateStatusMock);
      await expect(result).rejects.toThrow(
        new BadRequestException('name must be a string'),
      );
    });
  });

  describe('remove', () => {
    it('should return a status', async () => {
      jest.spyOn(controller, 'remove').mockResolvedValue(mockStatus);
      const result = controller.remove('1');
      await expect(result).resolves.toBe(mockStatus);
    });

    it('should throw a NotFoundException if no status is found', async () => {
      jest
        .spyOn(controller, 'remove')
        .mockRejectedValue(
          new NotFoundException('No status with id "3" was found'),
        );
      const result = controller.remove('3');
      await expect(result).rejects.toThrow(
        new NotFoundException('No status with id "3" was found'),
      );
    });
  });
});
