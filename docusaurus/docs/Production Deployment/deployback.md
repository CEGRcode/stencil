---
sidebar_position: 2
id: deployback
title: Production Backend Deployment
sidebar_label: Backend deployment
---

---

## Install MongoDB
- The following steps assume you are logged in as root

```
sudo su -
```

#### Add MongoDB repo to yum repo

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

#### Configure server to start MongoDB on system reboot
```
sudo systemctl enable mongod
```

#### Start MongoDB server now
```
sudo systemctl start mongod
```

## Install STENCIL-backend

```
cd stencil/backend
npm install
```

## Configuring backend .env
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
DB_NAME="stencilDB"
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

- **FRONT_API should be set to the address of the STENCIL homepage, this is critical for authentication re-directs**

- SSO_TOKEN_KEY and SSO_TOKEN_IV are used to encrypting user ID by SSO protected redirecting page, and then decrypted by stencil login page. The key must be 32, IV must be 16 char; You should replace the two strings to your own.

- An example SSO redirecting page is provided in the repository directory sso_apache_site. The restricted directory should be an SSO protected directory. The redirecting page restricted/index.html should be defined as SSOURL. The cgi-bin/stencil.cgi.py file should be modifiedto match SSO_TOKEN_KEY and SSO_TOKEN_IV and redirect URL.

- If your frontend app needs to access api call from 3rd party, e.g. Galaxy server, you need to use proxy through backend server. In the frontend app, the URL "http://xxx.xxxx.xxxx.xx:xxxx/datasets/{options}" should be replaced with "http://backendserver:xxxx/datasets/{options}". Most browsers would prohibit cross-domain call for the front end, so that proxy is needed.

## Open Firewall
By default, the backend will not be open to the public. Add an exception to open the port the backed is serving at. This should be the 'API_PORT' variable declared in the .env file.

```
# Required for public access to the backend
sudo firewall-cmd --permanent --add-port=8081/tcp
```

## Install NodeJS load balancer (PM2)
- Install [`pm2`](https://www.npmjs.com/package/pm2) a production process manager for Node.js applications with a built-in load balancer.

```
sudo npm i -g pm2
```

### Configure PM2
- PM2 can be configured to auto-restart upon system reboot and to bring the STENCIL backend back online

```
pm2 startup
```

Example resulting output from CentOS 8 and user wkl29:
```
[PM2] Init System found: systemd
[PM2] To setup the Startup Script, copy/paste the following command:
sudo env PATH=$PATH:/usr/bin /usr/local/lib/node_modules/pm2/bin/pm2 startup systemd -u wkl29 --hp /home/wkl29
```
Copy/paste the resulting sudo command

```
[wkl29@artemis backend]$ sudo env PATH=$PATH:/usr/bin /usr/local/lib/node_modules/pm2/bin/pm2 startup systemd -u wkl29 --hp /home/wkl29
[sudo] password for wkl29:

                        -------------

__/\\\\\\\\\\\\\____/\\\\____________/\\\\____/\\\\\\\\\_____
 _\/\\\/////////\\\_\/\\\\\\________/\\\\\\__/\\\///////\\\___
  _\/\\\_______\/\\\_\/\\\//\\\____/\\\//\\\_\///______\//\\\__
   _\/\\\\\\\\\\\\\/__\/\\\\///\\\/\\\/_\/\\\___________/\\\/___
    _\/\\\/////////____\/\\\__\///\\\/___\/\\\________/\\\//_____
     _\/\\\_____________\/\\\____\///_____\/\\\_____/\\\//________
      _\/\\\_____________\/\\\_____________\/\\\___/\\\/___________
       _\/\\\_____________\/\\\_____________\/\\\__/\\\\\\\\\\\\\\\_
        _\///______________\///______________\///__\///////////////__


                          Runtime Edition

        PM2 is a Production Process Manager for Node.js applications
                     with a built-in Load Balancer.

                Start and Daemonize any application:
                $ pm2 start app.js

                Load Balance 4 instances of api.js:
                $ pm2 start api.js -i 4

                Monitor in production:
                $ pm2 monitor

                Make pm2 auto-boot at server restart:
                $ pm2 startup

                To go further checkout:
                http://pm2.io/


                        -------------

[PM2] Init System found: systemd
Platform systemd
Template
[Unit]
Description=PM2 process manager
Documentation=https://pm2.keymetrics.io/
After=network.target

[Service]
Type=forking
User=wkl29
LimitNOFILE=infinity
LimitNPROC=infinity
LimitCORE=infinity
Environment=PATH=/home/wkl29/.local/bin:/home/wkl29/bin:/usr/local/bin:/usr/bin:/usr/local/sbin:/usr/sbin:/usr/bin:/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin
Environment=PM2_HOME=/home/wkl29/.pm2
PIDFile=/home/wkl29/.pm2/pm2.pid
Restart=on-failure

ExecStart=/usr/local/lib/node_modules/pm2/bin/pm2 resurrect
ExecReload=/usr/local/lib/node_modules/pm2/bin/pm2 reload all
ExecStop=/usr/local/lib/node_modules/pm2/bin/pm2 kill

[Install]
WantedBy=multi-user.target

Target path
/etc/systemd/system/pm2-wkl29.service
Command list
[ 'systemctl enable pm2-wkl29' ]
[PM2] Writing init configuration in /etc/systemd/system/pm2-wkl29.service
[PM2] Making script booting at startup...
[PM2] [-] Executing: systemctl enable pm2-wkl29...
Created symlink /etc/systemd/system/multi-user.target.wants/pm2-wkl29.service → /etc/systemd/system/pm2-wkl29.service.
[PM2] [v] Command successfully executed.
+---------------------------------------+
[PM2] Freeze a process list on reboot via:
$ pm2 save

[PM2] Remove init script via:
$ pm2 unstartup systemd
```

### Spin up STENCIL backend
- Once you have configured the backend, below command will create a daemon that keeps the app running & restarts on internal app crashes, [read more here](https://pm2.io/doc/en/runtime/overview/?utm_source=pm2&utm_medium=website&utm_campaign=rebranding).

```
cd stencil/backend
pm2 start server.js --name STENCILbackend
```

- You need to update the `options` property in the above code with server specific certificate files, after requesting them from a certificate authority.
- Restart the app to apply changes.
- Read more about using certificates at [Node HTTPS docs](https://nodejs.org/api/https.html#https_https_createserver_options_requestlistener)

### Save PM2 configuration
This command lets PM2 know that all currently running apps (i.e., STENCIL) are to be restarted upon system reboot

```
pm2 save
```

Example output:
```
[wkl29@artemis backend]$ pm2 save
[PM2] Saving current process list...
[PM2] Successfully saved in /home/wkl29/.pm2/dump.pm2
```

### Convenient commands for PM2

##### Restart PM2 instance
```
pm2 restart STENCILbackend
```

##### Reload PM2 instance
```
pm2 reload STENCILbackend
```

##### Stop PM2 instance
```
pm2 stop STENCILbackend
```

##### Delete PM2 instance
```
pm2 delete STENCILbackend
```

## Learn More

---
- PM2 documentation [HERE](https://pm2.io/doc/en/runtime/overview/?utm_source=pm2&utm_medium=website&utm_campaign=rebranding).
