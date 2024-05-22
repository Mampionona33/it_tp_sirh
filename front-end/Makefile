SHELL := /bin/bash

clean:
	docker system prune -a

down:	
	docker compose down

build:	down
	docker compose build

build-and-serve: build
	docker compose up --remove-orphans

serve:
	docker compose up