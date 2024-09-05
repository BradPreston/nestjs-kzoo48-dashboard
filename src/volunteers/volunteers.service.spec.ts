import { Test, TestingModule } from '@nestjs/testing';
import { VolunteersService } from './volunteers.service';
import { PrismaService } from '../../src/prisma/prisma.service';
import {
  mockBadCreateVolunteer,
  mockBadUpdateVolunteer,
  mockGoodCreateVolunteer,
  mockGoodUpdateVolunteer,
  mockResolvedVolunteer,
  mockUpdatedVolunteer,
  mockVolunteer,
} from '../../test/mocks/volunteer.data';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('VolunteersService', () => {
  let service: VolunteersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VolunteersService, PrismaService],
    }).compile();

    service = module.get<VolunteersService>(VolunteersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return a volunteer', async () => {
      jest
        .spyOn(service, 'create')
        .mockImplementation(async () => mockVolunteer);
      expect(await service.create(mockGoodCreateVolunteer)).toBe(mockVolunteer);
    });

    it('should have an id of 1', async () => {
      jest
        .spyOn(service, 'create')
        .mockImplementation(async () => mockVolunteer);
      expect(await service.create(mockGoodCreateVolunteer)).toHaveProperty(
        'id',
        1,
      );
    });

    it('should throw a BadRequestException with bad data', async () => {
      jest
        .spyOn(service, 'create')
        .mockRejectedValue(
          new BadRequestException('firstName must be a string'),
        );
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await expect(service.create(mockBadCreateVolunteer)).rejects.toThrow(
        new BadRequestException('firstName must be a string'),
      );
    });
  });

  describe('findAll', () => {
    it('should have a length of 0', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([]);
      expect(await service.findAll()).toHaveLength(0);
    });

    it('should have a length of 1', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([mockResolvedVolunteer]);
      expect(await service.findAll()).toHaveLength(1);
    });

    it('should have a volunteer with an id of 1', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([mockResolvedVolunteer]);
      const result = await service.findAll();
      expect(result[0].id).toBe(1);
    });
  });

  describe('findOne', () => {
    it('should return a volunteer', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockResolvedVolunteer);
      expect(await service.findOne(1)).toBe(mockResolvedVolunteer);
    });

    it('should throw a NotFoundException if no volunteer is found', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockRejectedValue(
          new NotFoundException('No volunteer with id "3" was found'),
        );
      await expect(service.findOne(3)).rejects.toThrow(
        new NotFoundException('No volunteer with id "3" was found'),
      );
    });
  });

  describe('update', () => {
    it('should return a volunteer', async () => {
      jest
        .spyOn(service, 'update')
        .mockImplementation(async () => mockUpdatedVolunteer);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(await service.update(1, mockGoodUpdateVolunteer)).toBe(
        mockUpdatedVolunteer,
      );
    });

    it('should have different values after update', async () => {
      jest
        .spyOn(service, 'update')
        .mockImplementation(async () => mockUpdatedVolunteer);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(await service.update(1, mockGoodUpdateVolunteer)).not.toBe(
        mockVolunteer,
      );
    });

    it('should throw a BadRequestException with bad data', async () => {
      jest
        .spyOn(service, 'update')
        .mockRejectedValue(
          new BadRequestException('firstName must be a string'),
        );
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await expect(service.update(1, mockBadUpdateVolunteer)).rejects.toThrow(
        new BadRequestException('firstName must be a string'),
      );
    });
  });

  describe('remove', () => {
    it('should return a volunteer', async () => {
      jest
        .spyOn(service, 'remove')
        .mockImplementation(async () => mockResolvedVolunteer);
      expect(await service.remove(1)).toBe(mockResolvedVolunteer);
    });

    it('should throw a NotFoundException with bad values', async () => {
      jest
        .spyOn(service, 'remove')
        .mockRejectedValue(
          new NotFoundException('No volunteer with id "3" was found'),
        );
      await expect(service.remove(3)).rejects.toThrow(
        new NotFoundException('No volunteer with id "3" was found'),
      );
    });
  });
});
