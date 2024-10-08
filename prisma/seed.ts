// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
dotenv.config();

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  const status1 = await prisma.status.upsert({
    where: { name: 'active' },
    update: {},
    create: {
      name: 'active',
    },
  });

  const status2 = await prisma.status.upsert({
    where: { name: 'outdated' },
    update: {},
    create: {
      name: 'outdated',
    },
  });

  const status3 = await prisma.status.upsert({
    where: { name: 'archived' },
    update: {},
    create: {
      name: 'archived',
    },
  });

  const category1 = await prisma.category.upsert({
    where: { name: 'Amatuer' },
    update: {},
    create: {
      name: 'Amatuer',
      statusId: 1,
    },
  });
  const category2 = await prisma.category.upsert({
    where: { name: 'Professional' },
    update: {},
    create: {
      name: 'Professional',
      statusId: 1,
    },
  });
  // create two dummy entries
  const entry1 = await prisma.entry.upsert({
    where: { email: 'john.doe@example.com' },
    update: {},
    create: {
      firstName: 'John',
      lastName: 'Doe',
      phone: '(123) 456-7890',
      email: 'john.doe@example.com',
      categoryId: 1,
      teamName: "John's Awesome Team",
      additionalEmails: [],
      statusId: 1,
    },
  });

  const entry2 = await prisma.entry.upsert({
    where: { email: 'marry.miller@domain.com' },
    update: {},
    create: {
      firstName: 'Mary',
      lastName: 'Miller',
      phone: '(987) 654-3210',
      email: 'marry.miller@domain.com',
      categoryId: 2,
      teamName: 'Marry and the Heartbreakers',
      additionalEmails: [
        'peter.hamption@example.com',
        'darcy.dentler@test.com',
      ],
      statusId: 1,
    },
  });

  const volunteer1 = await prisma.volunteer.upsert({
    where: { email: 'betty.crocker@email.com' },
    update: {},
    create: {
      firstName: 'Betty',
      lastName: 'Crocker',
      phone: '(567) 123-3456',
      email: 'betty.crocker@email.com',
      role: 'Advertising',
      statusId: 1,
    },
  });

  const user1 = await prisma.user.upsert({
    where: { email: 'test@email.com' },
    update: {
      password: process.env.TEST_USER_PASSWORD,
    },
    create: {
      email: 'test@email.com',
      password: process.env.TEST_USER_PASSWORD,
      statusId: 1,
    },
  });

  console.log('Statuses');
  console.log('------------------------------------------');
  console.log({ status1, status2, status3 });
  console.log('Categories');
  console.log('------------------------------------------');
  console.log({ category1, category2 });
  console.log('\n');
  console.log('Entries');
  console.log('------------------------------------------');
  console.log({ entry1, entry2 });
  console.log('\n');
  console.log('Volunteers');
  console.log('------------------------------------------');
  console.log({ volunteer1 });
  console.log('Users');
  console.log('------------------------------------------');
  console.log({ user1 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
