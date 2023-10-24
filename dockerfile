# Utilisez une image de base Node.js
FROM node:14

# Définissez le répertoire de travail dans le conteneur
WORKDIR /app

# Copiez le package.json et le package-lock.json dans le conteneur
COPY package*.json ./

# Installez les dépendances
RUN npm install

# Copiez le reste des fichiers du projet dans le conteneur
COPY . .

# Exécutez un terminal interactif lorsque le conteneur démarre
CMD ["/bin/bash"]
