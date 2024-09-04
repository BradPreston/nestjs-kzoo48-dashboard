import { Status } from '@prisma/client';
import { CreateStatusDto } from 'src/statuses/dto/create-status.dto';

export const mockStatus: Status = {
  id: 1,
  name: 'test',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const newStatus: CreateStatusDto = {
  name: 'test',
};

export const mockStatusUpdated: Status = {
  id: 1,
  name: 'test UPDATED',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const badUpdateStatusMock = {
  name: 1,
};

export const goodUpdateStatusMock = {
  name: 'test UPDATED',
};
