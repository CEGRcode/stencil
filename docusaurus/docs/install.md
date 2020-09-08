---
id: install
title: Install dependencies
sidebar_label: Install
---

## NodeJS

- Requires nodejs >= 10 (or any latest release)
- Install from [here](https://nodejs.org/en/download/)

## MongoDB

- Requires mongoDB >= 4.0.1
- Install mongoDB for MacOS using tarball from [here](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x-tarball/)

### Setup using [homebrew](https://brew.sh/)

- Add mongoDB Homebrew Tap

```
brew tap mongodb/brew
```

- Install mongodb community server

```
brew install mongodb-community@4.2
```

- Before you start MongoDB for the first time, create the directory to which the mongod process will write data. I'm setting it in on my `~/Desktop` for simplicity.

```
mkdir -p ~/Desktop/data/db
```

- To start your mongodb server

```
mongod --dbpath ~/Desktop/data/db
```

- In another terminal tab, you can access the mongo prompt using the below command

```
mongo
```

## Docker

- Requires Docker >= 19.03
- Install from [here](https://docs.docker.com/get-docker/)

> optional, if you plan to dockerize your final applications
