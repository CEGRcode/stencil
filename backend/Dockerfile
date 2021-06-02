# NODE REST API
# This dockerfile is used to build the backend code
# Use docker-compose.yml file to launch backend.

# base image from official node LTS version
FROM node:10

LABEL maintainer="docker_username"

# Create app directory to hold the application code
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source into the container.
COPY . .

EXPOSE 8081
CMD [ "npm", "start" ]
