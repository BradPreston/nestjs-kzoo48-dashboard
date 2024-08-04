// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy articles
  const entry1 = await prisma.entry.upsert({
    where: { id: 1 },
    update: {},
    create: {
      firstName: 'John',
      lastName: 'Doe',
      phone: '(123) 456-7890',
      email: 'john.doe@example.com',
      category: 'Amatuer',
      teamName: "John's Awesome Team",
      additionalEmails: [],
    },
  });

  const entry2 = await prisma.entry.upsert({
    where: { id: 2 },
    update: {},
    create: {
      firstName: 'Mary',
      lastName: 'Miller',
      phone: '(987) 654-3210',
      email: 'marry.miller@domain.com',
      category: 'Professional',
      teamName: 'Marry and the Heartbreakers',
      additionalEmails: [
        'peter.hamption@example.com',
        'darcy.dentler@test.com',
      ],
    },
  });

  console.log({ entry1, entry2 });
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
