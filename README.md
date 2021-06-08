# stencil v1.0.0
A web engine for visualizing and sharing life science datasets

## Documentation
http://pughlab.mbg.cornell.edu/stencil/

Quickstart:

1. Start mongo db server.

2. Download source code:

   ```
   git clone https://github.com/CEGRcode/stencil.git
   ```

3. Install dependencies.

   ```
   cd stencil2/backend
   npm install

   cd stencil2/frontend
   npm install

   cd ..
   ```

4. Configure the web site.

   a. stencil2/backend/.env
   ```
   DB_HOST="localhost"                   // Mongo db host
   DB_NAME="testDB"                      // Mongo db database name
   API_PORT="8081                        // API port name

   FRONT_API="https://localhost:3000"    // root URL of the frontend

   HTTPS = true                          // using HTTPS
   HTTPSCERT = "/home/xxx/fullchain.pem" // Not used if HTTPS == false: path of https certificate   
   HTTPSKEY = "/home/xxx/privkey.pem"    // Not used if HTTPS == false: path of https key

   SSO_TOKEN_KEY = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" // Optional for SSO, must be 32 char
   SSO_TOKEN_IV = "AAAAAAAAAAAAAAAA"     // Optional for SSO, must be 16 char

   SESSION_ENCRYPTION = "xxxxxx"         // String used for encript session variables in cookies
   
   MASTER_PWD = "aaaaaa"                 // Optional: allows admin user to login as any user

   PROXY_SETTING='{"/xxx" : "http://xxx.xxxx.xxxx.xx:xxxx"}'   // Optional: proxy setting
      
   ```
   
   * SSO_TOKEN_KEY and SSO_TOKEN_IV are used to encrypting user ID by SSO protected redirecting page, and then decrypted by stencil login page. The key must be 32, IV must be 16 char; You should replace the two strings to your own.
   * An example SSO redirecting page is provided in the repository directory sso_apache_site. The restricted directory should be an SSO protected directory. The redirecting page restricted/index.html should be defined as SSOURL. The cgi-bin/stencil.cgi.py file should be modifiedto match SSO_TOKEN_KEY and SSO_TOKEN_IV and redirect URL.

   * If your frontend app needs to access api call from 3rd party, e.g. galaxy server, you need to use proxy  through backend server. In the frontend app, the URL "http://xxx.xxxx.xxxx.xx:xxxx/datasets/{options}" should be replaced with "http://backendserver:xxxx/datasets/{options}". Most browsers would prohibit cross-domain call for the front end, so that proxy is needed.



   b. stencil2/frontend/.env
   ```
   PORT="3000"                          // frontend port number
   HTTPS=false                          // activate HTTPS
   SSL_CRT_FILE=/home/xxx/fullchain.pem //path of https certificate   
   SSL_KEY_FILE=/home/xxx/privkey.pem   //path of https key
   BROWSER=none
   ```   
   * "Let’s Encript” offers free https certificate. You can set up the certificate by following instructions on its web site.  https://letsencrypt.org/getting-started/

   c. stencil2/frontend/src/Config.js
   ```
   apiURL: "http://localhost:8081",                    // URL of the backend server
   SSOURL: "http://localhost/restricted/index.html",   // Optional for SSO: URL of login page

   librariesEndPoint: "/libraries",                    // API endpoint for retrieve library list - DO NOT CHANGE
   libraryPageEndPoint: "/libraries/dbid",             // API endpoint for retrieve a library based on db id - DO NOT CHANGE
   ```

3. Start the backend and front end server.

   ```
   screen

   cd stencil2/backend

   npm start

   #press ctrl-a c to switch screen

   cd stencil2/frontend
   npm start
   ```

4. Post example data.

   Modify the postData.py and postLibrary.py located in stencil2/backend/utils.

   Replace the URL from "http://localhost/samples" to appropriate backend URL.

   ```
   cd stencil/backend/utils
      
   python postLibrary.py ../sampleData/example_lib.json
   ```

5. Open browser

   URL:  http://localhost:3000

6. Web access of image files stored in stencil:

   keep under stencil2/backend/sampleData/Images. They can be organized in sub-directories.

   The image url is: http//localhost:8081/images/subDirection/myImage.png
