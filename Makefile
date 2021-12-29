DOCKER_IP := "127.0.0.1"

regenerate_env: down
	docker-compose -f environment/docker-compose-hamstersbooks-permanent-fs.yml -p hamstersbooks down
	docker-compose -f environment/docker-compose-hamstersbooks-permanent-fs.yml -p hamstersbooks rm -f
	docker-compose -f environment/docker-compose-hamstersbooks-permanent-fs.yml -p hamstersbooks build web

up:
	@echo "APP_BASE_URL=http://$(DOCKER_IP)/" > ./environment/web.env
	DOCKER_HOST=$(DOCKER_HOST) docker-compose -f environment/docker-compose-hamstersbooks-permanent-fs.yml -p hamstersbooks up

down:
	docker-compose -f environment/docker-compose-hamstersbooks-permanent-fs.yml -p hamstersbooks kill

delete:
	docker-compose -f environment/docker-compose-hamstersbooks-permanent-fs.yml -p hamstersbooks kill
	docker-compose -f environment/docker-compose-hamstersbooks-permanent-fs.yml -p hamstersbooks rm -f -v


migrations-init:
	curl $(DOCKER_IP)/deploy/database/init


migrations-dryrun:
	curl $(DOCKER_IP)/deploy/database/migrate/dry-run


migrations-run:
	curl $(DOCKER_IP)/deploy/database/migrate/run


watch:
	npx webpack --mode development
	npx webpack --watch --mode development

release:
	rm -f build.tar
	rm -rf app-optimized
	php composer.phar install
	npm ci
	npx webpack --mode production 
	cp web/index.php app-optimized/index.php
	cp htaccess-enable-gzip-and-routing app-optimized/.htaccess
	cp htaccess-set-cache-control app-optimized/assets/.htaccess
	tar -cvf build.tar --exclude=.git app-optimized src sql constants.php vendor
