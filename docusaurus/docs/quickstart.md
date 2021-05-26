---
sidebar_position: 2
id: quick
title: Quickstart
sidebar_label: Quickstart
---

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
