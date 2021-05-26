---
sidebar_position: 1
id: install
title: Getting Started
sidebar_label: Getting Started
---

# Install dependencies

## NodeJS

- Requires NodeJS >= 10 (or any latest release)
- Install from [here](https://nodejs.org/en/download/)

### MacOS using [homebrew](https://brew.sh/)

```
brew install node
```

### CentOS 8 setup

```
# Install Node.js
sudo yum -y install nodejs
sudo npm i -g pm2
```

## MongoDB

- Requires MongoDB >= 4.0.1
- Install from [here](https://docs.mongodb.com/manual/administration/install-community/)

### MacOS using [homebrew](https://brew.sh/)

- Add mongoDB Homebrew Tap

```
brew tap mongodb/brew
```

- Install mongodb community server

```
brew install mongodb-community@4.2
```

- Before you start MongoDB for the first time, create the directory to which the mongod process will write data. The demo will set it on your `~/Desktop` for simplicity but this is not recommended for production.

```
mkdir -p ~/Desktop/data/db
```

- To start your mongodb server

```
mongod --dbpath ~/Desktop/data/db
```

### CentOS 8 setup

- These instructions assume sudo rights

#### Add MongoDB repo to yum repo
```
cat > /etc/yum.repos.d/mongodb-org-4.4.repo <<EOF
[mongodb-org-4.4]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/4.4/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.4.asc
EOF
```

#### Install MongoDB
```
sudo yum -y install mongodb-org
```
#### Configure server to start MongoDB on system reboot
```
sudo systemctl enable mongod
```

#### Configure SELinux policy to allow MongoDB to check system memory
```
sudo yum install checkpolicy
cat > mongodb_cgroup_memory.te <<EOF
module mongodb_cgroup_memory 1.0;

require {
      type cgroup_t;
      type mongod_t;
      class dir search;
      class file { getattr open read };
}

#============= mongod_t ==============
allow mongod_t cgroup_t:dir search;
allow mongod_t cgroup_t:file { getattr open read };
EOF
```

#### Install new mongoDB policy exception
```
checkmodule -M -m -o mongodb_cgroup_memory.mod mongodb_cgroup_memory.te
semodule_package -o mongodb_cgroup_memory.pp -m mongodb_cgroup_memory.mod
sudo semodule -i mongodb_cgroup_memory.pp
```

#### Configure SELinux policy to allow MongoDB to report on real-time system usage
```
cat > mongodb_proc_net.te <<EOF
module mongodb_proc_net 1.0;
require {
    type proc_net_t;
    type mongod_t;
    class file { open read };
}
#============= mongod_t ==============
allow mongod_t proc_net_t:file { open read };
EOF
```

#### Install new mongoDB policy exception
```
checkmodule -M -m -o mongodb_proc_net.mod mongodb_proc_net.te
semodule_package -o mongodb_proc_net.pp -m mongodb_proc_net.mod
sudo semodule -i mongodb_proc_net.pp
```

#### Start MongoDB server now
```
sudo systemctl start mongod
```
