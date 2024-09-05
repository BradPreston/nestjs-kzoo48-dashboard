import { Volunteer } from '@prisma/client';
import { CreateVolunteerDto } from 'src/volunteers/dto/create-volunteer.dto';

export const mockVolunteer: Volunteer = {
  id: 1,
  firstName: 'Jonn',
  lastName: 'Doe',
  phone: '1234567890',
  email: 'john.doe@email.com',
  role: 'test role',
  statusId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const mockGoodCreateVolunteer: CreateVolunteerDto = {
  firstName: 'Jonn',
  lastName: 'Doe',
  phone: '1234567890',
  email: 'john.doe@email.com',
  role: 'test role',
  statusId: 1,
};

export const mockBadCreateVolunteer = {
  firstName: 5,
  lastName: 'Doe',
  phone: '1234567890',
  email: 'john.doe@email.com',
  role: 'test role',
  statusId: 1,
};

export const mockResolvedVolunteer = {
  id: 1,
  firstName: 'Jonn',
  lastName: 'Doe',
  phone: '1234567890',
  email: 'john.doe@email.com',
  role: 'test role',
  statusId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  status: {
    id: 1,
    name: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

export const mockBadUpdateVolunteer = {
  firstName: 3,
};

export const mockGoodUpdateVolunteer = {
  firstName: 'Johnathan',
};

export const mockUpdatedVolunteer = {
  id: 1,
  firstName: 'Johnathan',
  lastName: 'Doe',
  phone: '1234567890',
  email: 'john.doe@email.com',
  role: 'test role',
  statusId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  status: {
    id: 1,
    name: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};
