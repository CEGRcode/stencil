---
id: doc2
title: Backend Node
sidebar_label: backend-node
---

A project template for Nodejs based REST API backend to serve genomic datasets.

> By default, this project supports web frontends built using [frontend-react](doc1.md) to visualize data.

## Quickstart

---

- Install cookiecutter

```bash
pip install 'cookiecutter>=1.7.2'
```

- Generate a backend REST API project :

```bash
cookiecutter https://github.com/CEGRcode/stencil.git --directory="backend-node"
```

> Follow the prompts to create your custom frontend web-app and go into your project folder.

- Install dependencies

```
npm install
```

> make sure your mongodb server is started before executing the below command.

- Start the backend application

```
npm start
```

- To add sampleData, open another terminal window.

```
cd ~/your_project_folder/utils/
```

- Insert data into the app using the POST request

```py
python postData.py ../sampleData/example.json
```

- Open up a browser and go to `http://localhost:8081/samples` to see the API in action serving JSON data.

### Features

---

- Minimalistic REST api implementing [HTTP methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) - `GET, POST, PATCH, DELETE`
- Example JSON and corresponding assets
- Default app configuration is provided in `.env`
- Python utility scripts to make `GET, POST, PATCH, DELETE` requests.
- Docker & docker-compose support

## Configuring your application

---

- Create a `.env` file or edit the existing.
- Add settings to your `.env` file as described in the table below.

**Config details**

| Setting           | Description                                                                                                                            |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `DB_URL`          | Use `localhost` to connect to a local installation of mongodb (default), please set it to `mongo:27017` while creating a docker image. |
| `DB_NAME`         | Name of the database to store app data.                                                                                                |
| `DATASETS_PATH`   | Absolute path to the root folder containing subdirectories for images & any required assets.                                           |
| `PUBLIC_ENDPOINT` | URL that will be used to serve the samples in your database. `/samples` is the default.                                                |
| `IMAGE_URL`       | custom routePath to serve the datasets.                                                                                                |
| `NODE_PORT`       | Port Number for your server, on which the api will be served.                                                                          |

> default `.env` configuration for local development

```
DB_URL="localhost"
DB_NAME="testDB"
PUBLIC_ENDPOINT="http://localhost:8081/samples/"
IMAGE_URL="http://localhost:8081/images/"
NODE_PORT=8081
```

_**API Endpoints**_

| Endpoint               | Supported HTTP Verbs | Description                                                         |
| ---------------------- | -------------------- | ------------------------------------------------------------------- |
| `/samples`             | `GET`                | Retrieve all samples                                                |
| `/samples/:targetName` | `GET`                | Retrieve all samples for target with targetName.                    |
| `/samples/id/:id`      | `GET`                | Retrieve all information for a sample using the mongodb's unique ID |
| `/samples`             | `POST`               | Create a new sample. (takes one sample at a time)                   |  |
| `/samples/:id`         | `PATCH`              | Edit sample information using mongodb's unique ID                   |
| `/samples/:id`         | `DELETE`             | Delete a sample using mongodb's unique ID.                          |

- Input JSON for the `PATCH` request need to be in the format below

```
[
    {"propName": "property_Name_Defined_In_Schema","value" : "your_Value"},
]

```

> Example for changing few properties for a sample is shown below

```
[
	{"propName": "sequencingInfo.assayType","value" : "ChIP-seq"},
	{"propName": "target","value" : "SSL1"},
]
```

## Deploying the application

---

> Below instructions have been tested for a server running `CentOS`. However, all the app related configuration and deployment is still valid for any linux distribution. Install relevant dependencies based on respective distros.

**Install dependencies on the Server**

- Install [`node`](https://nodejs.org/en/) (stable version) for `CentOS`, here is a [tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-a-centos-7-server).
- Install [`mongodb`](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-red-hat/) on the `CentOS` server.
- Install [`pm2`](https://www.npmjs.com/package/pm2) a production process manager for Node.js applications with a built-in load balancer.

**Server Specific Configuration**

- Create a `.env` file. Add and edit below fields to appropriate values :

```
DB_URL=""
DB_NAME=""
DATASETS_PATH=""
PUBLIC_ENDPOINT=""
IMAGE_URL=""
NODE_PORT=
```

- For example, a `.env` for a server `example.vmhost.psu.edu` by a user `bob` looks like below:

```
DB_URL="localhost"
DB_NAME="testDB"
DATASETS_PATH="/home/bob/imageAssets"
PUBLIC_ENDPOINT="https://example.vmhost.psu.edu:8081/samples/"
IMAGE_URL="https://example.vmhost.psu.edu:8081/images/"
NODE_PORT=8081
```

- Once you have configured the backend, below command will create a daemon and keeps the app running & restarts on internal app crashes, [read more here](https://pm2.io/doc/en/runtime/overview/?utm_source=pm2&utm_medium=website&utm_campaign=rebranding).

```
<!-- go into the project folder -->
cd <project_directory>

<!-- start the server using pm2 -->
pm2 start server.js --name APIServer
```

### Serving the API on `HTTPS`

---

- To enable `HTTPS` during deployment, replace the entire code in `server.js` with below code:

```
// importing the app
const app = require("./app");

// requiring the https, fs (node standard modules)
const https = require("https");
const fs = require("fs");

// load configuration through environment variables from .env to process.env
require("dotenv").config();

// add the certificate for https
var options = {
  key: fs.readFileSync("<location_to_your_key_file>"),
  cert: fs.readFileSync("<location_to_your_cert_file>")
};

// start the server, listening at the configured port.
var server = https.createServer(options, app).listen(process.env.NODE_PORT || 8080, function() {
  console.log("Express server listening on port " + process.env.NODE_PORT || 8080);
});

```

- You need to update the `options` property in the above code with server specific certificate files, after requesting them from a certificate authority.
- Restart the app to apply changes.
- Read more about using certificates at [Node HTTPS docs](https://nodejs.org/api/https.html#https_https_createserver_options_requestlistener)

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

## Updating dependencies

---

- To get a list of packages that are outdated, execute the below command from the project root directory
  - `npm outdated`
- From your project root directory, run the update command
  - `npm update`

> Updating dependencies sometimes breaks the app, which is expected and common software development. Refer the changelog for the packages that are updated to fix any issues.

More details on above command usage : [npm docs](https://docs.npmjs.com/updating-packages-downloaded-from-the-registry)

## Extending the app

---

- Recommend using [`Postman`](https://www.getpostman.com/) to develop, test and extend existing APIs.
