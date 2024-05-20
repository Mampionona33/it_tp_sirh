FROM httpd:alpine

WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

COPY --from=builder /app/build /usr/app/build

# Containers run nginx with global directives and defaults
ENTRYPOINT [ "nginx","-g", "daemon off;" ]
