---
id: doc1
title: Frontend React
sidebar_label: frontend-react
---

A project template for reactjs based web-frontend to visualize and share genomic data.

> _By default this frontend consumes the API served by [backend-node](doc2.md)._

## Quickstart

---

- Install cookiecutter

```bash
pip install 'cookiecutter>=1.7.2'
```

- Setup a backend application using [backend-node](doc2.md)

- Generate a frontend project :

```bash
cookiecutter https://github.com/CEGRcode/stencil.git  --directory="frontend-react"
```

> Follow the prompts to create your custom frontend web-app and go into your project folder.

- Install dependencies

```
npm install
```

- Now, we can start the frontend application

```
npm start
```

- This automatically launches the app in your default browser. otherwise, open any browser and go to `http://localhost:3000` to view it.

> Without your backend server running parallely, you will not see anything on the frontend website that you just launched.

- Start your backend application and mongodb server in their respective terminals. (assuming you used the defaults specified in [backend-node](doc2.md))

```
# start mongodb server
mongod --dbpath ~/Desktop/data/db

# start backend api server
cd <your_backend_directory>

# to start backend
npm start

```

### Features

---

- Basic search.
- UCSC genome browser integration and track loader.
- Predefined React components for common bioinformatic analysis tools.
- Supports interactive charts using [nivo](https://nivo.rocks/).
- Docker & docker-compose support.

### Deploying the application

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). You can use the default `build` scripts to compile the project.

To `build` the project, use `npm run build` from your project's root folder. This will generate a **build** directory with minified code. For detailed instructions on how to use this **build** directory with nginx or its alternatives follow the official `deployment` instructions under **_Learn More_** section below.

## Building a Docker image

---

This project comes with a `Dockerfile`, which can be used to build a docker image. Below are the step by step commands to build and launch a dockerized container that uses `nginx:alpine` as base image.

```
<!-- generate a build for your app -->
npm run build

<!-- create a docker image -->
docker build --tag=demofrontend .

<!-- run the docker container -->
docker run -d -p 3000:80
```

You can view your application in a browser at `http://localhost:3000`. Assuming you have the backend application running to serve the API that this docker container can consume.

### Using docker-compose to combine backend and frontend deployment

---

To create a single standalone application that combines backend and frontend, we need to use `docker-compose.yml`.
Below are some build instructions and `docker-compose.yml` that packages both backend and frontend into a single app.

**Build an image for the backend ( instructions adapted from [backend-node](doc2.md) )**

- Configure the backend's `.env` as below to ensure proper communication between the mongodb & backend code.

  ```
  DB_URL="mongo:27017"
  DB_NAME="testDB"
  PUBLIC_ENDPOINT="http://localhost:8081/samples/"
  IMAGE_URL="http://localhost:8081/images/"
  NODE_PORT=8081

  ```

- Change the dataset path within the `app.js`

  ```
  <!-- Replace below line in app.js-->
  app.use("/images", express.static("<some_example_path>"));

  <!-- to below, before building the images -->
  app.use("/images", express.static("/srv/app/images"));

  ```

- Build the image
  - `docker build --tag=demobackend .`

:star: **Build an image for frontend**

```
<!-- generate a build for your app -->
npm run build

<!-- create a docker image -->
docker build --tag=demofrontend .
```

- Create a folder `Docker-App` on your `Desktop` and copy the `sampleData` folder provided in your backend into it.
- Create a new file `docker-compose.yml` in `Docker-App` and copy the below contents into it.

```
version: "3"
services:
  server:
    container_name: backend
    image: "demobackend"
    restart: always
    ports:
      - "8081:8081"
    volumes:
      - ./sampleData/images:/srv/app/images
    depends_on:
      - "mongo"
  mongo:
    image: "mongo"
    ports:
      - "27017:27017"
  client:
    container_name: frontend
    image: "demofrontend"
    expose:
      - 3000
    ports:
      - "3000:80"
    depends_on:
      - server
```

> The spaces in the file matter. read more about `docker-compose` [here](https://docs.docker.com/compose/).

- Your `Docker-App` directory should look like this:

```
|____Docker-App
| |____sampleData/
| |____docker-compose.yml

```

- Now to launch the entire application, run the below command from `~/Desktop/Docker-App/`
  - `docker compose up`
- Once the container is running, you can use the scripts in `sampleData/utils/` to insert sampleData.
- To stop the container, hit `ctrl + c` and then `docker compose down`

## Learn More

---

- Getting started with [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
- To learn React, check out the [React documentation](https://reactjs.org/).
- [**Code Splitting**](https://facebook.github.io/create-react-app/docs/code-splitting)
- [**Analyzing the Bundle Size**](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)
- [**Making a Progressive Web App**](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)
- [**Advanced Configuration**](https://facebook.github.io/create-react-app/docs/advanced-configuration)
- [**Deployment**](https://facebook.github.io/create-react-app/docs/deployment)
- [**`build` fails to minify**](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
