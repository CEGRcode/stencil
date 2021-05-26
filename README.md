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

   FRONT_API="https://localhost:3000"    //root URL of the frontend

   HTTPS = true                          // using HTTPS
   HTTPSCERT = "/home/xxx/fullchain.pem" //path of https certificate   
   HTTPSKEY = "/home/xxx/privkey.pem"    //path of https key

   SESSION_ENCRYPTION = "xxxxxx"
   SESSION_NAME = "stencil"
   MASTER_PWD = "aaaaaa"

   PROXY_SETTING='{"/xxx" : "http://xxx.xxxx.xxxx.xx:xxxx"}'   // proxy setting
   ```

   * If your frontend app needs to access api call from 3rd party, e.g. galaxy server, you need to use proxy  through backend server. In the frontend app, the URL "http://xxx.xxxx.xxxx.xx:xxxx/datasets/{options}" should be replaced with "http://backendserver:xxxx/datasets/{options}". Most browsers would prohibit cross-domain call for the front end, so that proxy is needed.



   b. stencil2/frontend/.env
   ```
   PORT="3000"                          // frontend port number
   HTTPS=true                           // activate HTTPS
   SSL_CRT_FILE=/home/xxx/fullchain.pem //path of https certificate   
   SSL_KEY_FILE=/home/xxx/privkey.pem   //path of https key
   BROWSER=none
   ```   

   c. stencil2/frontend/src/Config.js
   ```
   apiURL: "http://stencil.biohpc.cornell.edu:8081",// URL of the backend server
   SSOURL: "https://stencil.biohpc.cornell.edu",    // URL of login page

   samplesEndpoint: "/samples",                     // api endpoint for retrieve sample list (deprecated)
   librariesEndPoint: "/libraries",		              // api endpoint for retrieve library list
   libraryPageEndPoint: "/libraries/dbid",          //api endpoint for retrieve a library based on db id
   trackHubPrefix: "http://genome.ucsc.edu/cgi-bin/hgTracks?db=sacCer3&hubUrl=" //genome growser URL prefix
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
