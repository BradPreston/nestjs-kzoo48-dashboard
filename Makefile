# Include the .env file to use the CONTAINER_ID variable
include .env

# docker commands
dev-up-build:
	docker compose --env-file ./.env.development.local -f docker-compose.dev.yml up --build --no-cache -d
dev-build:
	docker compose --env-file ./.env.development.local -f docker-compose.dev.yml build --no-cache
dev-up:
	docker compose --env-file ./.env.development.local -f docker-compose.dev.yml up -d
dev-down:
	docker compose --env-file ./.env.development.local -f docker-compose.dev.yml down

# prisma commands
dev-generate:
	docker exec -it ${CONTAINER_ID} npx prisma generate
dev-migrate:
	docker exec -it ${CONTAINER_ID} npx prisma migrate dev
dev-seed:
	docker exec -it ${CONTAINER_ID} npx prisma db seed