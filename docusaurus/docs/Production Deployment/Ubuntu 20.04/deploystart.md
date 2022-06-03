---
sidebar_position: 1
id: deploystart
title: Deployment preparations
sidebar_label: Deployment preparations
---

---

## Deploying the application
**These instructions assume a clean build of Ubuntu 20.04 LTS with none of the dependencies installed.**

The instructions here have been tested for a server running `Ubuntu 20.04`. However, all the app related configuration and deployment should be generally valid for any linux distribution. Install relevant dependencies based on respective distros.

## Update and patch OS
- Best practice is to ensure your system is up-to-date before beginning any modifications

```
sudo apt update
sudo apt upgrade
sudo reboot
```

## Install NodeJS

```
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs
node --version
# 14.19.3
```

## Install MongoDB

```
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
sudo apt-get install -y mongodb-org
cat /etc/apt/sources.list.d/mongodb-org-5.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
echo "mongodb-org hold" | sudo dpkg --set-selections
echo "mongodb-org-database hold" | sudo dpkg --set-selections
echo "mongodb-org-server hold" | sudo dpkg --set-selections
echo "mongodb-org-shell hold" | sudo dpkg --set-selections
echo "mongodb-org-mongos hold" | sudo dpkg --set-selections
echo "mongodb-org-tools hold" | sudo dpkg --set-selections
sudo systemctl start mongod
sudo systemctl daemon-reload
sudo systemctl status mongod
sudo systemctl enable mongod #stop #restart
mongosh # test mongo shell access
```

## Install Apache

```
sudo apt install apache2
sudo ufw app list
sudo ufw status
sudo systemctl status apache2
```

## Make Service account

```
TODO
```

## Clone the repo

```
git clone https://github.com/CEGRcode/stencil.git
```
