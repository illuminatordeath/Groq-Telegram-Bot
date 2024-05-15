build:
	docker build -t groqtgbot .
run:
	docker run -d -p 3000:3000 --name groqtgbot --rm groqtgbot