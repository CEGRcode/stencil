---
sidebar_position: 3
id: deploy
title: Deployment
sidebar_label: Production deployment
---

## Updating dependencies
---
- Before deployment to a production environment, all STENCIL dependencies should be updated to reduce risk of using compromised repositories
- To get a list of packages that are outdated, execute the below command from the project root directory
  - `npm outdated`
- From your project root directory, run the update command
  - `npm update`

> Updating dependencies sometimes breaks the app, which is expected and common software development. Refer the changelog for the packages that are updated to fix any issues.

More details on above command usage : [npm docs](https://docs.npmjs.com/updating-packages-downloaded-from-the-registry)


## Deploying the application

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). You can use the default `build` scripts to compile the project.

To `build` the project, use `npm run build` from your project's root folder. This will generate a **build** directory with minified code. For detailed instructions on how to use this **build** directory with nginx or its alternatives follow the official `deployment` instructions under **_Learn More_** section below.

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
