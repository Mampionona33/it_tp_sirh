FROM nginx:alpine

# Copy main nginx configuration
COPY ./docker/nginx_docker/nginx.conf /etc/nginx/nginx.conf

# Copy server-specific configuration
COPY ./docker/nginx_docker/default.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Set entrypoint
ENTRYPOINT ["nginx", "-g", "daemon off;"]
