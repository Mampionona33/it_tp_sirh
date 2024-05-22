# Utilisez une image de base Node.js
FROM node:18 AS builder

# Définissez le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le package.json et le yarn.lock dans le conteneur
COPY package.json yarn.lock ./

# Installer les packages
RUN yarn install --frozen-lockfile

# Copier le reste des fichiers du projet dans le conteneur
COPY . .

# Construire l'application React
RUN yarn build

# Utilisez une nouvelle image de base Node.js pour le serveur
FROM node:18 AS server

# Définissez le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers de construction de l'étape précédente
COPY --from=builder /app/build ./build

# Copier le package.json et le yarn.lock pour installer uniquement les dépendances nécessaires au serveur
COPY package.json yarn.lock ./

# Installer uniquement les dépendances de production pour le serveur
RUN yarn install --production

# Copier le fichier serveur
COPY server.mts ./

# Exposer le port 3000 pour l'application
EXPOSE 3000

# Commande pour démarrer le serveur Express
CMD ["node", "server.mts"]
