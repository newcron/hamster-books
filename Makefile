DOCKER_IP := "127.0.0.1"

regenerate_env: stop
	docker-compose -f environment/docker-compose-hamstersbooks-permanent-fs.yml -p hamstersbooks down
	docker-compose -f environment/docker-compose-hamstersbooks-permanent-fs.yml -p hamstersbooks rm -f
	docker-compose -f environment/docker-compose-hamstersbooks-permanent-fs.yml -p hamstersbooks build web

run:
	@echo "APP_BASE_URL=http://$(DOCKER_IP)/" > ./environment/web.env
	DOCKER_HOST=$(DOCKER_HOST) docker-compose -f environment/docker-compose-hamstersbooks-permanent-fs.yml -p hamstersbooks up

stop:
	docker-compose -f environment/docker-compose-hamstersbooks-permanent-fs.yml -p hamstersbooks kill

delete:
	docker-compose -f environment/docker-compose-hamstersbooks-permanent-fs.yml -p hamstersbooks kill
	docker-compose -f environment/docker-compose-hamstersbooks-permanent-fs.yml -p hamstersbooks rm -f


migrations-init:
	curl $(DOCKER_IP)/deploy/database/init


migrations-dryrun:
	curl $(DOCKER_IP)/deploy/database/migrate/dry-run


migrations-run:
	curl $(DOCKER_IP)/deploy/database/migrate/run


release:
	rm -f build.tar
	grunt build
