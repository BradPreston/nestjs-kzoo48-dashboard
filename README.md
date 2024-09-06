# Kazoo48 Admin Dashboard

## Welcome

This application is used to run the backend of the [Kazoo48 Film Festival](https://kazoo48.com/) admin dashboard. This app is built using [TypeScript](https://www.typescriptlang.org/), [NestJS](https://nestjs.com/), [Prisma](https://www.prisma.io/), [PostgreSQL](https://www.postgresql.org/), and [Docker](https://www.docker.com/).

## Getting started

This app is currently configured to run in a Linux or a MacOS environment.

**_Required:_** create a copy of the .env.example and name it .env.development.local because Docker Compose requires this file to create an env file in the container.

Step 1) Build the Docker container

```
make dev-build
```

Step 2) Run the Docker container

```
make dev-up
```

Step 3) Generate the Prisma Client

```
make dev-generate
```

Step 4) Run the migrations

```
make dev-migrate
```

Step 5) (_optional_) Seed the database

```
make dev-seed
```

After running the steps 3-5, you will not need to run them again to run on your machine later. Simply run `make dev-up` to run the app the next time you want to start the container.

To stop running the container, run

```
make dev-down
```
