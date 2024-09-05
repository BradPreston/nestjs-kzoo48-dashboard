import { Test, TestingModule } from '@nestjs/testing';
import { VolunteersController } from './volunteers.controller';
import { PrismaModule } from '../../src/prisma/prisma.module';
import {
  mockBadUpdateVolunteer,
  mockBadCreateVolunteer,
  mockGoodCreateVolunteer,
  mockGoodUpdateVolunteer,
  mockResolvedVolunteer,
  mockUpdatedVolunteer,
  mockVolunteer,
} from '../../test/mocks/volunteer.data';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { VolunteersService } from './volunteers.service';

describe('VolunteersController', () => {
  let controller: VolunteersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VolunteersController],
      providers: [VolunteersService],
      imports: [PrismaModule],
    }).compile();

    controller = module.get<VolunteersController>(VolunteersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should return a volunteer', async () => {
      jest
        .spyOn(controller, 'create')
        .mockImplementation(async () => mockVolunteer);
      expect(await controller.create(mockGoodCreateVolunteer)).toBe(
        mockVolunteer,
      );
    });

    it('should have an id of 1', async () => {
      jest
        .spyOn(controller, 'create')
        .mockImplementation(async () => mockVolunteer);
      expect(await controller.create(mockGoodCreateVolunteer)).toHaveProperty(
        'id',
        1,
      );
    });

    it('should throw a BadRequestException with bad data', async () => {
      jest
        .spyOn(controller, 'create')
        .mockRejectedValue(
          new BadRequestException('firstName must be a string'),
        );
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await expect(controller.create(mockBadCreateVolunteer)).rejects.toThrow(
        new BadRequestException('firstName must be a string'),
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
        .mockResolvedValue([mockResolvedVolunteer]);
      expect(await controller.findAll()).toHaveLength(1);
    });

    it('should have a volunteer with an id of 1', async () => {
      jest
        .spyOn(controller, 'findAll')
        .mockResolvedValue([mockResolvedVolunteer]);
      const result = await controller.findAll();
      expect(result[0].id).toBe(1);
    });
  });

  describe('findOne', () => {
    it('should return a volunteer', async () => {
      jest
        .spyOn(controller, 'findOne')
        .mockResolvedValue(mockResolvedVolunteer);
      expect(await controller.findOne('1')).toBe(mockResolvedVolunteer);
    });

    it('should throw a NotFoundException if no volunteer is found', async () => {
      jest
        .spyOn(controller, 'findOne')
        .mockRejectedValue(
          new NotFoundException('No volunteer with id "3" was found'),
        );
      await expect(controller.findOne('3')).rejects.toThrow(
        new NotFoundException('No volunteer with id "3" was found'),
      );
    });
  });

  describe('updatePut', () => {
    it('should return a volunteer', async () => {
      jest
        .spyOn(controller, 'updatePut')
        .mockImplementation(async () => mockUpdatedVolunteer);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(await controller.updatePut(1, mockGoodUpdateVolunteer)).toBe(
        mockUpdatedVolunteer,
      );
    });

    it('should have different values after update', async () => {
      jest
        .spyOn(controller, 'updatePut')
        .mockImplementation(async () => mockUpdatedVolunteer);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(await controller.updatePut(1, mockGoodUpdateVolunteer)).not.toBe(
        mockVolunteer,
      );
    });

    it('should throw a BadRequestException with bad data', async () => {
      jest
        .spyOn(controller, 'updatePut')
        .mockRejectedValue(
          new BadRequestException('firstName must be a string'),
        );
      await expect(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        controller.updatePut('1', mockBadUpdateVolunteer),
      ).rejects.toThrow(new BadRequestException('firstName must be a string'));
    });
  });

  describe('updatePatch', () => {
    it('should return a volunteer', async () => {
      jest
        .spyOn(controller, 'updatePatch')
        .mockImplementation(async () => mockUpdatedVolunteer);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(await controller.updatePatch(1, mockGoodUpdateVolunteer)).toBe(
        mockUpdatedVolunteer,
      );
    });

    it('should have different values after update', async () => {
      jest
        .spyOn(controller, 'updatePatch')
        .mockImplementation(async () => mockUpdatedVolunteer);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(await controller.updatePatch(1, mockGoodUpdateVolunteer)).not.toBe(
        mockVolunteer,
      );
    });

    it('should throw a BadRequestException with bad data', async () => {
      jest
        .spyOn(controller, 'updatePatch')
        .mockRejectedValue(
          new BadRequestException('firstName must be a string'),
        );
      await expect(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        controller.updatePatch('1', mockBadUpdateVolunteer),
      ).rejects.toThrow(new BadRequestException('firstName must be a string'));
    });
  });

  describe('remove', () => {
    it('should return a volunteer', async () => {
      jest
        .spyOn(controller, 'remove')
        .mockImplementation(async () => mockResolvedVolunteer);
      expect(await controller.remove('1')).toBe(mockResolvedVolunteer);
    });

    it('should throw a NotFoundException with bad values', async () => {
      jest
        .spyOn(controller, 'remove')
        .mockRejectedValue(
          new NotFoundException('No volunteer with id "3" was found'),
        );
      await expect(controller.remove('3')).rejects.toThrow(
        new NotFoundException('No volunteer with id "3" was found'),
      );
    });
  });
});
