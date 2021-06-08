---
sidebar_position: 6
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

## Configuring the backend

---

- Create a `.env` file or edit the existing.
- Add settings to your `.env` file as described in the table below.

**Config details**

|Setting| Description|
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `DB_HOST`          | Use `localhost` to connect to a local installation of mongodb (default), please set it to `mongo:27017` while creating a docker image. |
| `DB_NAME`         | Name of the database to store app data. |
| `API_PORT`         | API port name data. |
| `FRONT_API`         | root URL of the frontend data. |
| `HTTPS`         | Boolean determining if STENCIL uses HTTPS data. |
| `HTTPSCERT`         | Not used if HTTPS == false: Path of https certificate  data. |
| `HTTPSKEY`         | Not used if HTTPS == false: Path of https key data. |
| `SESSION_ENCRYPTION`         | String used for encript session variables in cookies. |
| `MASTER_PWD`         | Master login password data. |
| `SVC_STENCIL_PWD`         | Password to enable STENCIL POST from token data. |
| `PROXY_SETTING`         | Proxy address data. |


> default `.env` configuration for local development

```
DB_HOST="localhost"
DB_NAME="testDB"
API_PORT=8081
FRONT_API="https://localhost:3000"
HTTPS=true
HTTPSCERT = "/home/xxx/fullchain.pem"   
HTTPSKEY = "/home/xxx/privkey.pem"
SESSION_ENCRYPTION = "xxxxxx"
MASTER_PWD = "aaaaaa"
SVC_STENCIL_PWD = "bbbbbb"
PROXY_SETTING='{"/xxx" : "http://xxx.xxxx.xxxx.xx:xxxx"}'
```

- SSO_TOKEN_KEY and SSO_TOKEN_IV are used to encrypting user ID by SSO protected redirecting page, and then decrypted by stencil login page. The key must be 32, IV must be 16 char; You should replace the two strings to your own.

- An example SSO redirecting page is provided in the repository directory sso_apache_site. The restricted directory should be an SSO protected directory. The redirecting page restricted/index.html should be defined as SSOURL. The cgi-bin/stencil.cgi.py file should be modifiedto match SSO_TOKEN_KEY and SSO_TOKEN_IV and redirect URL.

- If your frontend app needs to access api call from 3rd party, e.g. galaxy server, you need to use proxy through backend server. In the frontend app, the URL "http://xxx.xxxx.xxxx.xx:xxxx/datasets/{options}" should be replaced with "http://backendserver:xxxx/datasets/{options}". Most browsers would prohibit cross-domain call for the front end, so that proxy is needed.

## Configuring the frontend

---

- Create a `.env` file or edit the existing.
- Add settings to your `.env` file as described in the table below.

**Config details**

|Setting| Description|
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `PORT`          | Frontend PORT number |
| `HTTPS`         | Boolean determining if STENCIL uses HTTPS |
| `SSL_CRT_FILE`         | path of https certificate  data. |
| `SSL_KEY_FILE`         | path of https key data. |
| `BROWSER`         | Browser support data. |

> default `.env` configuration for local development

```
PORT="3000"
HTTPS=true
SSL_CRT_FILE=/home/xxx/fullchain.pem
SSL_KEY_FILE=/home/xxx/privkey.pem
BROWSER=none
```
- "Let’s Encript” offers free https certificate. You can set up the certificate by following instructions on its web site. https://letsencrypt.org/getting-started/

## Configuring STENCIL Config.js

---

- Modify *stencil/frontend/src/Config.js*

**Config details**

|Setting| Description|
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `apiURL`          | URL of the backend server |
| `SSOURL`          | Optional for SSO: URL of login page |
| `librariesEndPoint`          | API endpoint for retrieve library list - DO NOT CHANGE |
| `libraryPageEndPoint`          | API endpoint for retrieve a library based on db id - DO NOT CHANGE |

> Sample Config.js

```
apiURL: "http://localhost:8081",
SSOURL: "http://localhost/restricted/index.html",
librariesEndPoint: "/libraries",
libraryPageEndPoint: "/libraries/dbid"
```

## Deploying the application

---

> Below instructions have been tested for a server running `CentOS`. However, all the app related configuration and deployment is still valid for any linux distribution. Install relevant dependencies based on respective distros.

**Install dependencies on the Server**

- Install [`node`](https://nodejs.org/en/) (stable version) for `CentOS`, here is a [tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-a-centos-7-server).
- Install [`mongodb`](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-red-hat/) on the `CentOS` server.
- Install [`pm2`](https://www.npmjs.com/package/pm2) a production process manager for Node.js applications with a built-in load balancer.
- Once you have configured the backend, below command will create a daemon and keeps the app running & restarts on internal app crashes, [read more here](https://pm2.io/doc/en/runtime/overview/?utm_source=pm2&utm_medium=website&utm_campaign=rebranding).

```
<!-- go into the project folder -->
cd <project_directory>

<!-- start the server using pm2 -->
pm2 start server.js --name APIServer
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
