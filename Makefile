.PHONY: build run stop test clean help

# Variables
IMAGE_NAME = loto-stats
CONTAINER_NAME = loto-stats-app
PORT = 8080

build: ## Construire l'image Docker
	@echo "🔨 Construction de l'image Docker..."
	docker build -t $(IMAGE_NAME):latest .
	@echo "✅ Image construite avec succès: $(IMAGE_NAME):latest"

run: ## Lancer le conteneur
	@echo "🚀 Lancement du conteneur..."
	docker run -d \
		--name $(CONTAINER_NAME) \
		-p $(PORT):80 \
		$(IMAGE_NAME):latest
	@echo "✅ Conteneur lancé sur http://localhost:$(PORT)"

stop: ## Arrêter et supprimer le conteneur
	@echo "🛑 Arrêt du conteneur..."
	@docker stop $(CONTAINER_NAME) 2>/dev/null || true
	@docker rm $(CONTAINER_NAME) 2>/dev/null || true
	@echo "✅ Conteneur arrêté"

logs: ## Afficher les logs du conteneur
	docker logs -f $(CONTAINER_NAME)

test: build ## Construire et tester le conteneur
	@echo "🧪 Test du conteneur..."
	@$(MAKE) stop
	@$(MAKE) run
	@echo "⏳ Attente du démarrage du serveur..."
	@sleep 3
	@echo "🔍 Test de la connexion HTTP..."
	@curl -f http://localhost:$(PORT) > /dev/null 2>&1 && \
		echo "✅ Test réussi: le serveur répond correctement" || \
		(echo "❌ Test échoué: le serveur ne répond pas" && exit 1)
	@$(MAKE) stop

clean: stop ## Nettoyer les images et conteneurs
	@echo "🧹 Nettoyage..."
	@docker rmi $(IMAGE_NAME):latest 2>/dev/null || true
	@echo "✅ Nettoyage terminé"

restart: stop run ## Redémarrer le conteneur
