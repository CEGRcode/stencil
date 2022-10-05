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
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;
include /usr/share/nginx/modules/*.conf;
events {
    worker_connections 1024;
}
http {
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';
    access_log  /var/log/nginx/access.log  main;
    sendfile            on;
    tcp_nopush          on;
    tcp_nodelay         on;
    keepalive_timeout   65;
    types_hash_max_size 2048;
    include             /etc/nginx/mime.types;
    default_type        application/octet-stream;
    include /etc/nginx/conf.d/*.conf;

    server {
        listen 80;
        server_name   artemis.cac.cornell.edu;
        root          /usr/share/nginx/html;
        include       /etc/nginx/default.d/*.conf;

        location / {
          proxy_set_header   X-Forwarded-For $remote_addr;
          proxy_set_header   Host $http_host;
          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection "upgrade";
          root      /usr/share/nginx/html;
	        index     index.html;
	        try_files $uri $uri/ /index.html;
        }
        error_page 404 /404.html;
            location = /40x.html {
        }
        error_page 500 502 503 504 /50x.html;
            location = /50x.html {
        }
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
- Remove PORT information for production Deployment

**Config details**

|Setting| Description|
| ----------------- | -------------------------------- |
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

> Production `.env` configuration

```
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

> Sample Config.js for local development

```
apiURL: "http://localhost:8081",
SSOURL: "http://localhost/restricted/index.html",
librariesEndPoint: "/libraries",
libraryPageEndPoint: "/libraries/dbid"
```

> Sample Config.js for production development

```
apiURL: "http://artemis.cac.cornell.edu:8081",
SSOURL: "http://localhost/restricted/index.html",
librariesEndPoint: "/libraries",
libraryPageEndPoint: "/libraries/dbid"
```

## Minify STENCIL-Frontend
```
cd stencil/frontend
npm run build
```


## Deploy STENCIL-frontend to NGINX
```
cp -r build/* /usr/share/nginx/html
sudo systemctl reload nginx
```
