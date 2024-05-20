SHELL := /bin/bash

down:
	docker compose down

build:	down
	docker compose build

serve: build
	docker compose up