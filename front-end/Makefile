SHELL := /bin/bash

clean:
	docker system prune -a

down:	clean
	docker compose down

build:	down
	docker compose build

serve: build
	docker compose up