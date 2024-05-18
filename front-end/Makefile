install:
	yarn

build: install
	yarn build

build-container: build
	docker-compose up --build -d

deploy: install build-container
	yarn deploy-docker
