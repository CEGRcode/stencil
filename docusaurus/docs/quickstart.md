---
sidebar_position: 2
id: quick
title: Quickstart
sidebar_label: Quickstart
---

import useBaseUrl from '@docusaurus/useBaseUrl';

- Quickstart assumes software dependencies are already [installed](install.md).

## Clone the repo

```
git clone https://github.com/CEGRcode/stencil.git
```

## Start MongoDB server

```
# start mongodb server
mongod --dbpath ~/Desktop/data/db
```

## Activate backend

### Install backend dependencies

```
cd stencil/backend
npm install
```

### Start backend

```
npm start
```

## Activate frontend

### Install frontend dependencies
```
cd stencil/frontend
npm install
```

### Start frontend

```
npm start
```

- This automatically launches the app in your default browser. otherwise, open any browser and go to `http://localhost:3000` to view it.

> Without your backend server running parallely, you will not see anything on the frontend website that you just launched.


## Register initial Admin account
The account username 'root' is configured to be an Admin automatically.
<img alt="Docusaurus with Keytar" src={useBaseUrl('/img/Register-1.png')} />

After successful registration, you will be returned to the Login page. Use the credentials you initialized the 'root' account for to login.

<img alt="Docusaurus with Keytar" src={useBaseUrl('/img/Register-2.png')} />

All other accounts are initially registered as 'guest'. The Admin account is able to modify user permissions for all registered accounts.
<img alt="Docusaurus with Keytar" src={useBaseUrl('/img/Register-3.png')} />


## POST sample data
Requires Python3+ and 'requests' module

To install python3 requests module:
```
pip3 install --user requests
```

POST data
```
cd stencil/backend/utils
sh post_all.sh
```
