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
	docker exec -it 34298a313e43b2ea98aa357058a5a768bfc5c7bb3bc683e7b0626c0ababcf9c2 npx prisma generate
dev-migrate:
	docker exec -it 34298a313e43b2ea98aa357058a5a768bfc5c7bb3bc683e7b0626c0ababcf9c2 npx prisma migrate dev
dev-seed:
	docker exec -it 34298a313e43b2ea98aa357058a5a768bfc5c7bb3bc683e7b0626c0ababcf9c2 npx prisma db seed