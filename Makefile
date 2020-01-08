TAG=eligundry/eligundry.com:latest

build:
	docker build -f Dockerfile.new -t $(TAG) .

push:
	docker push $(TAG)

up:
	docker-compose up

publish: build push

lektor-server:
	lektor server -f webpack
