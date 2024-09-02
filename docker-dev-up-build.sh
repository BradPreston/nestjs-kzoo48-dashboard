#!/bin/bash
docker compose --env-file ./.env.development.local -f docker-compose.dev.yml up --build -d