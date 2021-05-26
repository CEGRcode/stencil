---
sidebar_position: 6
id: docker
title: Building a Docker image
sidebar_label: Docker
---

---

## Docker

- Requires Docker >= 19.03
- Install from [here](https://docs.docker.com/get-docker/)

> optional, if you plan to dockerize your final applications


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

## Docker & Docker deployment

---

You can build an image for this app using the provided `Dockerfile`, but it is useless on its own, since this project requires a `MongoDB` database to connect & store data. To achieve this we need to use the `docker-compose.yml` in conjunction to the `Dockerfile`.

**Building a Docker Image**

- Before building a docker image, we need to update the `.env` file to contain configuration as below. This ensures proper communication between the mongodb instance and our app within a docker container.

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

> you can change the tag name from `demobackend` to anything you like, but make sure you also update the name in the `docker-compose.yml` file.

- To run the app use the command:
  - `docker-compose up`
- To insert example data use the `postData.py` script within the `utils` folder:
  - `cd ./sampleData`
  - `python postData.py example.json`

**Known issues**

- _When you stop and start the containerized app, the data that was inserted into the db will be lost, to solve this problem docker uses [volumes](https://docs.docker.com/storage/volumes/)._
- _MacOSX & mongodb-container volume [problem](https://stackoverflow.com/a/34903503) & [work around](https://docs.docker.com/storage/volumes/)._
