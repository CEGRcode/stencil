# frontend website being served from nginx
# base image from apline (linux) with nginx
FROM nginx:alpine

LABEL maintainer="{{cookiecutter.docker_username}}"

# Copy the build into the container
COPY /build /usr/share/nginx/html

# Copy modified nginx configuration to enable react-router urls
COPY nginx.conf /etc/nginx/conf.d/default.conf

# expose port on the container
EXPOSE 80

# start the server
CMD ["nginx", "-g", "daemon off;"]
