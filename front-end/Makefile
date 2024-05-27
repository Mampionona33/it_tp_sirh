SHELL := /bin/bash
EDITOR ?= nano
SERVER_NAME ?= gestion-de-paie-ls.com
CONTAINER_NAME ?= la-ligne-scandinave-front-end

install-nginx:
	sudo apt install curl gnupg2 ca-certificates lsb-release ubuntu-keyring -y && \
	curl https://nginx.org/keys/nginx_signing.key | gpg --dearmor | sudo tee /usr/share/keyrings/nginx-archive-keyring.gpg >/dev/null && \
	gpg --dry-run --quiet --no-keyring --import --import-options import-show /usr/share/keyrings/nginx-archive-keyring.gpg && \
	echo "deb [signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg] http://nginx.org/packages/ubuntu `lsb_release -cs` nginx" | sudo tee /etc/apt/sources.list.d/nginx.list && \
	echo -e "Package: *\nPin: origin nginx.org\nPin: release o=nginx\nPin-Priority: 900\n" | sudo tee /etc/apt/preferences.d/99nginx && \
	sudo apt update && \
	sudo apt install nginx -y

create-nginx-config:
	sudo nano /etc/nginx/sites-available/gestion-de-paie-ls

reset-docker:
	docker system prune -a

view-docker-status:
	docker system df

remove-cache-docker:
	docker builder prune

remove-image-docker:
	docker image rm -f $(CONTAINER_NAME)

down:	
	docker compose down --remove-orphans

build: down
	docker compose build --force-rm --no-cache

build-and-serve: build
	docker compose up --remove-orphans

serve:
	docker compose up

ifeq ($(OS),Windows_NT)
open-hosts:
	powershell -Command "Start-Process notepad C:\Windows\System32\drivers\etc\hosts -Verb RunAs"
add-host:
	powershell -Command "if (!(Select-String -Path 'C:\Windows\System32\drivers\etc\hosts' -Pattern '$(SERVER_NAME)')) { Add-Content -Path 'C:\Windows\System32\drivers\etc\hosts' -Value '127.0.0.1	$(SERVER_NAME)' }"
remove-host:
	powershell -Command "(Get-Content 'C:\Windows\System32\drivers\etc\hosts') -notmatch '$(SERVER_NAME)' | Set-Content 'C:\Windows\System32\drivers\etc\hosts'"
else
open-hosts:
	sudo $(EDITOR) /etc/hosts
add-host:
	@grep -q $(SERVER_NAME) /etc/hosts || echo '127.0.0.1	$(SERVER_NAME)' | sudo tee -a /etc/hosts > /dev/null
remove-host:
	sudo sed -i '/$(SERVER_NAME)/d' /etc/hosts
endif
