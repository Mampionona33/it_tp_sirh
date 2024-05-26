# Utilisez une image de base Node.js
FROM node:18 AS builder

# Définissez le répertoire de travail dans le conteneur
WORKDIR /app

# Copiez le package.json et le yarn.lock dans le conteneur
COPY package.json ./

# Install npm latest
RUN npm install -g npm@latest

# Installez Yarn avec npm en utilisant l'option --force
RUN npm install -g --force yarn && yarn install --frozen

# Copiez le reste des fichiers du projet dans le conteneur
COPY . .


# Construire l'application React
RUN yarn build

# Copie public files to build
COPY ./public ./build/public

# Expose port 3000 or by default port 80 to the outside world
EXPOSE 3000

# Start Nginx when the container is run
CMD ["node","server.js"]
