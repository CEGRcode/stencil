---
sidebar_position: 2
id: install
title: Dependency Installation
sidebar_label: Install Dependencies
---

# Install dependencies

## MacOS using [homebrew](https://brew.sh/)

### Install NodeJS

- Requires NodeJS >= 14 (or any latest release)
- Install from [here](https://nodejs.org/en/download/)

```
brew install node
```

### Install MongoDB

- Requires MongoDB >= 5.0
- Install from [here](https://docs.mongodb.com/manual/administration/install-community/)
- Add mongoDB Homebrew Tap

```
brew tap mongodb/brew
```

- Install mongodb community server

```
brew install mongodb-community@5.0
```

- Before you start MongoDB for the first time, create the directory to which the mongod process will write data. The demo will set it on your `~/Desktop` for simplicity but this is not recommended for production.

```
mkdir -p ~/Desktop/data/db
```

- To start your mongodb server

```
mongod --dbpath ~/Desktop/data/db
```

## CentOS 8 setup
- These instructions assume sudo rights

### Install NodeJS
- Requires NodeJS >= 14 (or any latest release)
- Install from [here](https://nodejs.org/en/download/)

```
# Install Node.js
sudo dnf module enable nodejs:14
sudo dnf install nodejs
sudo npm i -g pm2
```

### Install MongoDB
- Add MongoDB repo to yum repo

```
cat > /etc/yum.repos.d/mongodb-org-5.0.repo <<EOF
[mongodb-org-5.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/\$releasever/mongodb-org/5.0/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-5.0.asc
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
```

```
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
        type sysctl_net_t;
        type mongod_t;
        class dir search;
        class file { getattr open read };
}
#============= mongod_t ==============
#!!!! This avc is allowed in the current policy
allow mongod_t sysctl_net_t:dir search;
allow mongod_t sysctl_net_t:file open;
#!!!! This avc is allowed in the current policy
allow mongod_t sysctl_net_t:file { getattr read };
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

#### Convenient commands for mongoDB

##### Check status of MongoDB
```
sudo systemctl status mongod
```

##### Turn off MongoDB
```
sudo systemctl stop mongod
```

##### Restart MongoDB
```
sudo systemctl restart mongod
```

### Firewall configurations
CentOS 8 closes most ports to the public by default. Firewall exceptions should be added for the STENCIL frontend to be publicly visible and for the frontend to communicate to the backend. These ports exceptions should be changed if STENCIL is hosted through other ports.

```
sudo firewall-cmd --zone=public --permanent --add-port 8081/tcp
sudo firewall-cmd --zone=public --permanent --add-port 3000/tcp
sudo firewall-cmd --reload
```
