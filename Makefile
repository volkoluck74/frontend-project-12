lint-frontend:
	make -C frontend lint

install:
	npm ci

start:
	npx start-server -s ./frontend/dist

build:
	rm -rf frontend/dist
	npm run build