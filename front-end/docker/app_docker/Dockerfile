# Utilisez une image de base Node.js
FROM node:18 as builder

# Installer make
RUN apt-get update && apt-get install -y make

# Installation de Yarn
RUN apt-get install -y curl gnupg && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && \
    apt-get install -y yarn

# Définissez le répertoire de travail dans le conteneur
WORKDIR /app

# Installer 'serve' pour servir les fichiers statiques
RUN npm install -g serve

# Copiez le package.json et le yarn.lock dans le conteneur
COPY package.json yarn.lock ./

# Copiez le reste des fichiers du projet dans le conteneur
COPY . .

# Installer les packages
RUN yarn install --verbosity=verbose --frozen-lockfile


# Build the app
RUN npm run build --ENV=production

# Exposer le port 3000 pour l'application
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["serve", "-s", "build"]
