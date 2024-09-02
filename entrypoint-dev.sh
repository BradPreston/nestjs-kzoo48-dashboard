#!/bin/bash

npx prisma generate && prisma migrate dev && prisma db seed
npm run start:dev