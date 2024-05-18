FROM nginx:latest

# Copier les fichiers de build depuis le répertoire local
COPY ./build /usr/share/nginx/html

# Copier la configuration Nginx personnalisée
COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
