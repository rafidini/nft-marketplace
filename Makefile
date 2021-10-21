build:
	docker-compose build

up:
	docker-compose up

relaunch:
	make build
	make up