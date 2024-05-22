SHELL := /bin/bash

EDITOR ?= vim

clean:
	docker system prune -a

down:	
	docker compose down

build:	down
	docker compose build

build-and-serve:	build
	docker compose up --remove-orphans

serve:
	docker compose up

ifeq	($(OS),Windows_NT)
	open-hosts:
		powershell -Command "Start-Process notepad C:\Windows\System32\drivers\etc\hosts -Verb RunAs"
else
    open-hosts:
		sudo $(EDITOR) /etc/hosts
endif