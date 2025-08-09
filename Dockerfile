# Utilise l'image Node.js officielle Alpine (plus légère)
FROM node:20-alpine

# Définit le répertoire de travail dans le conteneur
WORKDIR /app

# Copie les fichiers package.json et package-lock.json
COPY package*.json ./

# Installe toutes les dépendances (nécessaires pour le build)
RUN npm ci && npm cache clean --force

# Copie le code source
COPY . .

# Build l'application
RUN npm run build

# Nettoie les devDependencies après le build
RUN npm prune --production

# Expose le port 3000
EXPOSE 3000

# Crée un utilisateur non-root pour la sécurité
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

# Change le propriétaire des fichiers
USER nestjs

# Commande pour démarrer l'application
CMD ["npm", "run", "start:prod"]
