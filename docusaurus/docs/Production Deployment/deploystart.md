---
sidebar_position: 1
id: deploystart
title: Deployment preparations
sidebar_label: Deployment preparations
---

---

## Deploying the application
**These instructions assume a clean build of CentOS 8 with none of the dependencies installed.**

The instructions here have been tested for a server running `CentOS 8`. However, all the app related configuration and deployment should be generally valid for any linux distribution. Install relevant dependencies based on respective distros.

## Install NodeJS
- Requires NodeJS >= 14 (or any latest release)
- Install from [here](https://nodejs.org/en/download/)

```
# Install Node.js
sudo dnf module enable nodejs:14
sudo dnf install nodejs
```

#### Update the NPM package manager

```
sudo npm install -g npm
```

## Clone the repo

```
git clone https://github.com/CEGRcode/stencil.git
```

#### Updating STENCIL dependencies
- Before deployment to a production environment, all STENCIL dependencies should be updated to reduce risk of using compromised repositories
- To get a list of packages that are outdated, execute the below command from the STENCIL project root directory
  - `npm outdated`
- From your project root directory, run the update command
  - `npm update`

```
cd stencil/backend
npm update
npm install
```

```
cd stencil/frontend
npm update
npm install
```

> Updating dependencies sometimes breaks the app, which is expected and common software development. Refer the changelog for the packages that are updated to fix any issues.

More details on above command usage : [npm docs](https://docs.npmjs.com/updating-packages-downloaded-from-the-registry)

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
- Guide to install [`node`](https://nodejs.org/en/) (stable version) for `CentOS`, here is a [tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-a-centos-7-server).
- Guide to install [`mongodb`](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-red-hat/) on the `CentOS` server.
