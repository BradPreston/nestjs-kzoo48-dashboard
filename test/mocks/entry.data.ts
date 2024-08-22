import { Entry } from '@prisma/client';
import { CreateEntryDto } from 'src/entries/dto/create-entry.dto';

export const mockEntry: Entry = {
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
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const newEntry: CreateEntryDto = {
  firstName: 'John',
  lastName: 'Doe',
  phone: '1234567890',
  email: 'john.doe@email.com',
  categoryId: 1,
  teamName: "John's test team",
  additionalEmails: [],
};
