SHELL := /bin/bash
EDITOR ?= nano
SERVER_NAME ?= gestion-de-paie-ls.com
CONTAINER_NAME ?= la-ligne-scandinave-front-end

reset-docker:
	docker system prune -a

remove-docker_image:
	docker image rm -f $(CONTAINER_NAME)

down:	
	docker compose down --remove-orphans

build: down
	docker compose build --force-rm --no-cache

build-and-serve: build
	docker compose up --remove-orphans

run-container:
	docker compose up

ifeq ($(OS),Windows_NT)
open-hosts:
	powershell -Command "Start-Process notepad C:\Windows\System32\drivers\etc\hosts -Verb RunAs"
add-host:
	powershell -Command "if (!(Select-String -Path 'C:\Windows\System32\drivers\etc\hosts' -Pattern '$(SERVER_NAME)')) { Add-Content -Path 'C:\Windows\System32\drivers\etc\hosts' -Value '127.0.0.1 $(SERVER_NAME)' }"
remove-host:
	powershell -Command "(Get-Content 'C:\Windows\System32\drivers\etc\hosts') -notmatch '$(SERVER_NAME)' | Set-Content 'C:\Windows\System32\drivers\etc\hosts'"
else
open-hosts:
	sudo $(EDITOR) /etc/hosts
add-host:
	@grep -q $(SERVER_NAME) /etc/hosts || echo '127.0.0.1 $(SERVER_NAME)' | sudo tee -a /etc/hosts > /dev/null
remove-host:
	sudo sed -i '/$(SERVER_NAME)/d' /etc/hosts
endif
