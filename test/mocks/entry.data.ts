import { Entry } from '@prisma/client';
import { CreateEntryDto } from 'src/entries/dto/create-entry.dto';
import { UpdateEntryDto } from 'src/entries/dto/update-entry.dto';

export const mockEntry: Entry = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  phone: '7184567890',
  email: 'john.doe@email.com',
  categoryId: 1,
  teamName: "John's test team",
  additionalEmails: [],
  paid: false,
  paymentId: null,
  statusId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const createEntryBad: CreateEntryDto = {
  lastName: 'Doe',
  phone: '7184567890',
  email: 'john.doe@email.com',
  categoryId: 1,
  teamName: "John's test team",
  additionalEmails: [],
  paid: false,
  paymentId: null,
};

export const updateEntryBad: UpdateEntryDto = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  categoryId: '1',
};

export const mockEntries: Entry[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    phone: '1234567890',
    email: 'john.doe@email.com',
    categoryId: 1,
    teamName: "John's test team",
    additionalEmails: [],
    paymentId: null,
    paid: false,
    statusId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    firstName: 'Mary',
    lastName: 'Miller',
    phone: '0987654321',
    email: 'mary.miller@test.com',
    categoryId: 2,
    teamName: "Mary's team",
    additionalEmails: ['michael.motte@email.com'],
    paymentId: 'abc123',
    paid: true,
    statusId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const mockUpdatedEntry: Entry = {
  id: 1,
  firstName: 'John updated',
  lastName: 'Doe updated',
  phone: '1234567890',
  email: 'john.doe@email.com',
  categoryId: 1,
  teamName: "John's test team",
  additionalEmails: [],
  paymentId: null,
  paid: false,
  statusId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const newEntry: CreateEntryDto = {
  firstName: 'John',
  lastName: 'Doe',
  phone: '7184567890',
  email: 'john.doe@email.com',
  categoryId: 1,
  teamName: "John's test team",
  additionalEmails: [],
  paid: false,
  paymentId: null,
  statusId: 1,
};

export const updateEntry: UpdateEntryDto = {
  firstName: 'John updated',
  lastName: 'Doe updated',
  phone: '7184567890',
  email: 'john.doe@email.com',
  categoryId: 1,
  teamName: "John's test team",
  additionalEmails: [],
  paid: false,
  paymentId: null,
  statusId: 1,
};
