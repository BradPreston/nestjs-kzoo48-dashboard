# docker commands
dev-up-build:
	sudo docker compose --env-file ./.env.development.local -f docker-compose.dev.yml up --build --no-cache -d
dev-build:
	sudo docker compose --env-file ./.env.development.local -f docker-compose.dev.yml build --no-cache
dev-up:
	sudo docker compose --env-file ./.env.development.local -f docker-compose.dev.yml up -d
dev-down:
	sudo docker compose --env-file ./.env.development.local -f docker-compose.dev.yml down

# prisma commands
dev-generate:
	docker exec -it nestjs-kzoo48-dashboard-nestjs_api-1 npx prisma generate
dev-migrate:
	docker exec -it nestjs-kzoo48-dashboard-nestjs_api-1 npx prisma migrate dev
dev-seed:
	docker exec -it nestjs-kzoo48-dashboard-nestjs_api-1 npx prisma db seed