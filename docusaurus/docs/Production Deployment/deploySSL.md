---
sidebar_position: 4
id: ssl
title: Add SSL to Frontend
sidebar_label: SSL security
---

---

## Install snap on CentOS 8

#### Add EPEL repository to CentOS 8

```
sudo dnf -y install epel-release
sudo dnf -y upgrade
```

#### Install and configure snapd

Install snapd
```
sudo yum -y install snapd
```

Enable to communication socket for snapd to function
```
sudo systemctl enable --now snapd.socket
```

Create symlink to snap binary
```
sudo ln -s /var/lib/snapd/snap /snap
```

**You may need to log out and/or restart the system for all changes to take effect**

Confirm snap is up to date
```
sudo snap install core
sudo snap refresh core
```

## Remove any pre-existing Certbot packages

Alternative Certbot instances will conflict with this version. Remove them before continuing if present.
```
sudo dnf remove certbot
```

```
sudo yum remove certbot
```

## Install certbot

Install certbot
```
sudo snap install --classic certbot
```

Create symlink to certbot binary
```
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

## Run certbot

This will automatically configure NGINX with a SSL provided by Certbot
```
sudo certbot --nginx
```

## Configure backend with SSL certificate

#### Change the .env file to route to the correct locations.

- Example is for 'artemis.cac.cornell.edu'
- You should substitute your DNS here making sure to change 'http' to 'https'

```
# Frontend URL
FRONT_API="https://artemis.cac.cornell.edu"

#set HTTPS or not, for HTTPS full path of HTTPSCERT and HTTPSKEY must be set
HTTPS = true
HTTPSCERT = "/etc/letsencrypt/live/artemis.cac.cornell.edu/fullchain.pem"
HTTPSKEY = "/etc/letsencrypt/live/artemis.cac.cornell.edu/privkey.pem"
```

#### Add certificate permissions
Certificates were generated using root and are not necessarily accessible by the backend. To accommodate this, we will create a new group that only has permissions to view the certificates.

Solution adapted from [here](https://stackoverflow.com/questions/48078083/lets-encrypt-ssl-couldnt-start-by-error-eacces-permission-denied-open-et)
- Example is for user 'wkl29'
```
// Create group with root and wkl29 as members
sudo groupadd nodecert
sudo usermod -a -G nodecert wkl29
sudo usermod -a -G nodecert root

sudo adduser wkl29 nodecert
sudo adduser root nodecert

// Make the relevant letsencrypt folders owned by said group.
sudo chgrp -R nodecert /etc/letsencrypt/live
sudo chgrp -R nodecert /etc/letsencrypt/archive

// Allow group to open relevant folders
sudo chmod -R 750 /etc/letsencrypt/live
sudo chmod -R 750 /etc/letsencrypt/archive
```

**You may need to log out and/or restart the system for all changes to take effect**

## Configure frontend
- Example is for 'artemis.cac.cornell.edu'

Update /stencil/frontend/src/Config.js to access the backend the HTTPS
```
const settings = {
  apiURL: "https://artemis.cac.cornell.edu:8081",
  SSOURL: "https://artemis.cac.cornell.edu",
  librariesEndPoint: "/libraries",
  libraryPageEndPoint: "/libraries/dbid",
  trackHubPrefix: "http://genome.ucsc.edu/cgi-bin/hgTracks?db=sacCer3&hubUrl="
};
```

## Learn More

---
- Certbot instructions for NGINX on CentOS 8 [HERE](https://certbot.eff.org/instructions?ws=nginx&os=centosrhel8).
