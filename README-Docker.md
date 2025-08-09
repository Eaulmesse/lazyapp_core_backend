# Docker Setup - LazyApp Backend

Ce guide explique comment utiliser Docker avec votre application NestJS.

## Prérequis

- Docker installé sur votre machine
- Docker Compose V2 (commande `docker compose`) 
  - Si vous avez l'ancienne version, utilisez `docker-compose` au lieu de `docker compose`

## Fichiers Docker

- `Dockerfile` : Image de production optimisée
- `Dockerfile.dev` : Image de développement avec hot reload
- `docker-compose.yml` : Configuration pour production et développement
- `.dockerignore` : Fichiers à exclure du build Docker

## Commandes disponibles

### Développement

```bash
# Lancer l'application en mode développement avec hot reload
npm run docker:dev

# L'application sera accessible sur http://localhost:3001
```

### Production

```bash
# Lancer l'application en mode production
npm run docker:prod

# L'application sera accessible sur http://localhost:3002
```

### Commandes Docker directes

```bash
# Build de l'image
npm run docker:build

# Lancer le conteneur
npm run docker:run

# Arrêter tous les services
npm run docker:stop
```

### Commandes Docker Compose

```bash
# Développement
docker compose --profile dev up --build

# Production
docker compose up --build

# Arrêter
docker compose down

# Voir les logs
docker compose logs -f
```

## Structure des services

### Service `app` (Production)
- Port : 3002 (host) → 3000 (conteneur)
- Environment : production
- Optimisé pour la performance

### Service `app-dev` (Développement)
- Port : 3001 (host) → 3000 (conteneur)
- Environment : development
- Volume monté pour le hot reload
- Profil : dev (activé avec --profile dev)

## Variables d'environnement

Vous pouvez créer un fichier `.env` pour définir vos variables :

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://...
```

## Réseau

Les services utilisent un réseau Docker personnalisé `lazyapp_network` pour faciliter la communication entre conteneurs si vous ajoutez d'autres services (base de données, Redis, etc.).

## Prochaines étapes

Pour compléter votre setup Docker, vous pourriez ajouter :
- Service de base de données (PostgreSQL, MongoDB, etc.)
- Service de cache (Redis)
- Service de reverse proxy (Nginx)
- Monitoring (Prometheus, Grafana)
