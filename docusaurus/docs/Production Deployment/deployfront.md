---
sidebar_position: 3
id: deployfront
title: Production Frontend Deployment
sidebar_label: Frontend deployment
---

---
## Install NGINX for reverse-proxy

```
sudo dnf install nginx
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
- "Let’s Encript” offers free https certificate. You can set up the certificate by following instructions on its web site. https://letsencrypt.org/getting-started/

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

## Build React site
This will build an optimized website for serving.

```
cd stencil/frontend
npm run build
```

- Resulting built site will be in stencil/frontend/build. Move it to the hosted NGINX path folder.

```
cp -r stencil/frontend/build/* /usr/share/nginx/html/
```
