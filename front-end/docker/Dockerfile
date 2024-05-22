# STAGE 1: Build Stage
FROM node:18 as build-stage

# Create app directory
WORKDIR /usr/app

# Copy package.json and yarn.lock to the workdir
COPY package.json ./

# Install app dependencies
RUN yarn install --frozen-lockfile

# Copy all files in current dir to app dir
COPY . .

# Build the app
RUN yarn build

# STAGE 2: Serve Stage
FROM php:8.1-apache-bullseye
# FROM httpd:2.4

# Install required packages
RUN apt-get update && apt-get install -y --no-install-recommends \
    htop \
    default-mysql-client \
    && rm -rf /var/lib/apt/lists/*



# Enable mod_rewrite for Apache
RUN a2enmod rewrite

# Install PDO and mysqli extensions
RUN docker-php-ext-install pdo_mysql mysqli

# Copy server-specific configuration
COPY ./docker/apache_docker/httpd.conf /usr/local/apache2/conf/httpd.conf

# Create the directory for the application
RUN mkdir -p /var/www/html

# Set working directory
WORKDIR /var/www/html

# Clear default Apache index
RUN rm -rf /var/www/html/*

# Copy the built application from the build stage
COPY --from=build-stage /usr/app/build .

# Copier le fichier .htaccess
COPY .htaccess /var/www/html/

# Expose port 80
EXPOSE 80

# Start Apache
CMD ["apache2-foreground"]


# # STAGE 1: Build Stage
# FROM node:18 as build-stage

# # Create app directory
# RUN mkdir -p /usr/app

# # Copy all files in current dir to app dir
# COPY . /usr/app

# # Set working directory
# WORKDIR /usr/app

# # Install app dependencies
# RUN yarn install

# # Build the app
# RUN yarn build

# # STAGE 2: Production Stage
# FROM nginx:alpine

# # Copy main nginx configuration
# COPY ./docker/nginx_docker/nginx.conf /etc/nginx/nginx.conf

# # Copy server-specific configuration
# COPY ./docker/nginx_docker/default.conf /etc/nginx/conf.d/default.conf

# # Set working directory
# WORKDIR /usr/share/nginx/html

# # Clear default nginx index
# RUN rm -rf ./*

# # Copy from build stage
# COPY --from=build-stage /usr/app/build .

# # Expose port 80
# EXPOSE 80

# # Set entrypoint
# ENTRYPOINT ["nginx", "-g", "daemon off;"]
