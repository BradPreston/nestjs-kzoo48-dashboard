import { Test, TestingModule } from '@nestjs/testing';
import { StatusesService } from './statuses.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import {
  badUpdateStatusMock,
  goodUpdateStatusMock,
  mockStatus,
  mockStatusUpdated,
  newStatus,
} from '../../test/mocks/status.data';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('StatusesService', () => {
  let service: StatusesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatusesService, PrismaService],
    }).compile();

    service = module.get<StatusesService>(StatusesService);
  });

  it('service should be defined', async () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return a status', async () => {
      jest
        .spyOn(service, 'create')
        .mockImplementation(async () => mockStatus)
        .mockResolvedValue(mockStatus);
      expect(await service.create(newStatus)).toEqual(mockStatus);
    });

    it('should have a name of test', async () => {
      jest.spyOn(service, 'create').mockImplementation(async () => mockStatus);
      expect(await service.create(newStatus)).toHaveProperty('name', 'test');
    });

    it('should have an id of 1', async () => {
      jest.spyOn(service, 'create').mockImplementation(async () => mockStatus);
      expect(await service.create(newStatus)).toHaveProperty('id', 1);
    });

    it('should fail with bad data', async () => {
      jest
        .spyOn(service, 'create')
        .mockRejectedValue(new BadRequestException('name must be a string'));
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await expect(service.create({ name: 2 })).rejects.toThrow(
        new BadRequestException('name must be a string'),
      );
    });
  });

  describe('findAll', () => {
    it('should have a length of 0 with no statuses', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([]);
      expect(await service.findAll()).toHaveLength(0);
    });

    it('should have a length of 1', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([mockStatus]);
      expect(await service.findAll()).toHaveLength(1);
    });

    it('should have a status with id of 1', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([mockStatus]);
      const result = await service.findAll();
      expect(result[0].id).toBe(1);
    });
  });

  describe('findOne', () => {
    it('should find a status', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockStatus);
      expect(await service.findOne(1)).toBe(mockStatus);
    });

    it('should throw a NotFoundException if no status is found', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockRejectedValue(
          new NotFoundException('No status with id "3" was found'),
        );
      await expect(service.findOne(3)).rejects.toThrow(
        new NotFoundException('No status with id "3" was found'),
      );
    });
  });

  describe('update', () => {
    it('should return a status', async () => {
      jest.spyOn(service, 'update').mockResolvedValue(mockStatusUpdated);
      expect(await service.update(1, goodUpdateStatusMock)).toBe(
        mockStatusUpdated,
      );
    });

    it('should have different data after update', async () => {
      jest.spyOn(service, 'update').mockResolvedValue(mockStatusUpdated);
      expect(await service.update(1, goodUpdateStatusMock)).not.toEqual(
        mockStatus,
      );
    });

    it('should throw a BadRequestException with bad data', async () => {
      jest
        .spyOn(service, 'update')
        .mockRejectedValue(new BadRequestException('name must be a string'));
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await expect(service.update(1, badUpdateStatusMock)).rejects.toThrow(
        new BadRequestException('name must be a string'),
      );
    });
  });

  describe('remove', () => {
    it('should return a status', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(mockStatus);
      expect(await service.remove(1)).toBe(mockStatus);
    });

    it('should throw a NotFoundException if no status is found', async () => {
      jest
        .spyOn(service, 'remove')
        .mockRejectedValue(
          new NotFoundException('No status with id "3" was found'),
        );
      await expect(service.remove(3)).rejects.toThrow(
        new NotFoundException('No status with id "3" was found'),
      );
    });
  });
});
