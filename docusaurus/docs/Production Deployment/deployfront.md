---
sidebar_position: 3
id: deployfront
title: Production Frontend Deployment
sidebar_label: Frontend deployment
---

---
## Install NGINX for reverse-proxy

```
sudo dnf -y install nginx
```

Enable NGINX to start with reboot
```
sudo systemctl enable nginx
```

Turn NGINX on
```
sudo systemctl start nginx
```

Open CentOS 8 ports
```
sudo firewall-cmd --permanent --add-port=80/tcp
sudo firewall-cmd --permanent --add-port=443/tcp
# Reload firewall rules to take effect
sudo firewall-cmd --reload
```

## Configure NGINX for proxying
```
vim /etc/nginx/nginx.conf
```

```
server {
    listen       80 default_server;
    listen       [::]:80 default_server;
    server_name  _;
    root         /usr/share/nginx/html;

    # Load configuration files for the default server block.
    include /etc/nginx/default.d/*.conf;

     location / {
         proxy_set_header   X-Forwarded-For $remote_addr;
         proxy_set_header   Host $http_host;
         proxy_pass         http://localhost:3000;

         # enable WebSockets
         proxy_http_version 1.1;
         proxy_set_header Upgrade $http_upgrade;
         proxy_set_header Connection "upgrade";

     }

     error_page 404 /404.html;
        location = /40x.html {
     }

     error_page 500 502 503 504 /50x.html;
        location = /50x.html {
     }
}
```

## Install STENCIL-Frontend
```
cd stencil/frontend
npm install
```

## Configuring frontend .env
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

## Configuring STENCIL Config.js
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

## Minify STENCIL-Frontend
```
cd stencil/frontend
npm run build
```

```
cd /usr/share/nginx/html
cp -r /stencil/frontend/build/* .
```
