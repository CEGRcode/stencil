"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[355],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>m});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var d=r.createContext({}),p=function(e){var t=r.useContext(d),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},u=function(e){var t=p(e.components);return r.createElement(d.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},c=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,l=e.originalType,d=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),c=p(n),m=o,f=c["".concat(d,".").concat(m)]||c[m]||s[m]||l;return n?r.createElement(f,a(a({ref:t},u),{},{components:n})):r.createElement(f,a({ref:t},u))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var l=n.length,a=new Array(l);a[0]=c;var i={};for(var d in t)hasOwnProperty.call(t,d)&&(i[d]=t[d]);i.originalType=e,i.mdxType="string"==typeof e?e:o,a[1]=i;for(var p=2;p<l;p++)a[p]=n[p];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}c.displayName="MDXCreateElement"},7050:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>a,default:()=>s,frontMatter:()=>l,metadata:()=>i,toc:()=>p});var r=n(7462),o=(n(7294),n(3905));const l={sidebar_position:3,id:"deployfront",title:"Production Frontend Deployment",sidebar_label:"Frontend deployment"},a=void 0,i={unversionedId:"Production Deployment/CentOS 8/deployfront",id:"Production Deployment/CentOS 8/deployfront",title:"Production Frontend Deployment",description:"---",source:"@site/docs/Production Deployment/CentOS 8/deployfront.md",sourceDirName:"Production Deployment/CentOS 8",slug:"/Production Deployment/CentOS 8/deployfront",permalink:"/stencil/docs/Production Deployment/CentOS 8/deployfront",draft:!1,editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/Production Deployment/CentOS 8/deployfront.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3,id:"deployfront",title:"Production Frontend Deployment",sidebar_label:"Frontend deployment"},sidebar:"tutorialSidebar",previous:{title:"Backend deployment",permalink:"/stencil/docs/Production Deployment/CentOS 8/deployback"},next:{title:"SSL security",permalink:"/stencil/docs/Production Deployment/CentOS 8/ssl"}},d={},p=[{value:"Install NGINX for reverse-proxy",id:"install-nginx-for-reverse-proxy",level:2},{value:"Configure NGINX for proxying",id:"configure-nginx-for-proxying",level:2},{value:"Install STENCIL-Frontend",id:"install-stencil-frontend",level:2},{value:"Configuring frontend .env",id:"configuring-frontend-env",level:2},{value:"Configuring STENCIL Config.js",id:"configuring-stencil-configjs",level:2},{value:"Minify STENCIL-Frontend",id:"minify-stencil-frontend",level:2},{value:"Deploy STENCIL-frontend to NGINX",id:"deploy-stencil-frontend-to-nginx",level:2}],u={toc:p};function s(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("hr",null),(0,o.kt)("h2",{id:"install-nginx-for-reverse-proxy"},"Install NGINX for reverse-proxy"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"sudo dnf -y install nginx\n")),(0,o.kt)("p",null,"Enable NGINX to start with reboot"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"sudo systemctl enable nginx\n")),(0,o.kt)("p",null,"Turn NGINX on"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"sudo systemctl start nginx\n")),(0,o.kt)("p",null,"Open CentOS 8 ports"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"sudo firewall-cmd --permanent --add-port=80/tcp\nsudo firewall-cmd --permanent --add-port=443/tcp\n# Reload firewall rules to take effect\nsudo firewall-cmd --reload\n")),(0,o.kt)("h2",{id:"configure-nginx-for-proxying"},"Configure NGINX for proxying"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"vim /etc/nginx/nginx.conf\n")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'server {\n    listen       80 default_server;\n    listen       [::]:80 default_server;\n    server_name  _;\n    root         /usr/share/nginx/html;\n\n    # Load configuration files for the default server block.\n    include /etc/nginx/default.d/*.conf;\n\n     location / {\n         proxy_set_header   X-Forwarded-For $remote_addr;\n         proxy_set_header   Host $http_host;\n         proxy_pass         http://localhost:3000;\n\n         # enable WebSockets\n         proxy_http_version 1.1;\n         proxy_set_header Upgrade $http_upgrade;\n         proxy_set_header Connection "upgrade";\n\n     }\n\n     error_page 404 /404.html;\n        location = /40x.html {\n     }\n\n     error_page 500 502 503 504 /50x.html;\n        location = /50x.html {\n     }\n}\n')),(0,o.kt)("h2",{id:"install-stencil-frontend"},"Install STENCIL-Frontend"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"cd stencil/frontend\nnpm install\n")),(0,o.kt)("h2",{id:"configuring-frontend-env"},"Configuring frontend .env"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Create a ",(0,o.kt)("inlineCode",{parentName:"li"},".env")," file or edit the existing."),(0,o.kt)("li",{parentName:"ul"},"Add settings to your ",(0,o.kt)("inlineCode",{parentName:"li"},".env")," file as described in the table below.")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Config details")),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:null},"Setting"),(0,o.kt)("th",{parentName:"tr",align:null},"Description"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"PORT")),(0,o.kt)("td",{parentName:"tr",align:null},"Frontend PORT number")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"HTTPS")),(0,o.kt)("td",{parentName:"tr",align:null},"Boolean determining if STENCIL uses HTTPS")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"SSL_CRT_FILE")),(0,o.kt)("td",{parentName:"tr",align:null},"path of https certificate  data.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"SSL_KEY_FILE")),(0,o.kt)("td",{parentName:"tr",align:null},"path of https key data.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"BROWSER")),(0,o.kt)("td",{parentName:"tr",align:null},"Browser support data.")))),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"default ",(0,o.kt)("inlineCode",{parentName:"p"},".env")," configuration for local development")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'PORT="3000"\nHTTPS=true\nSSL_CRT_FILE=/home/xxx/fullchain.pem\nSSL_KEY_FILE=/home/xxx/privkey.pem\nBROWSER=none\n')),(0,o.kt)("h2",{id:"configuring-stencil-configjs"},"Configuring STENCIL Config.js"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Modify ",(0,o.kt)("em",{parentName:"li"},"stencil/frontend/src/Config.js"))),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Config details")),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:null},"Setting"),(0,o.kt)("th",{parentName:"tr",align:null},"Description"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"apiURL")),(0,o.kt)("td",{parentName:"tr",align:null},"URL of the backend server")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"SSOURL")),(0,o.kt)("td",{parentName:"tr",align:null},"Optional for SSO: URL of login page")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"librariesEndPoint")),(0,o.kt)("td",{parentName:"tr",align:null},"API endpoint for retrieve library list - DO NOT CHANGE")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"libraryPageEndPoint")),(0,o.kt)("td",{parentName:"tr",align:null},"API endpoint for retrieve a library based on db id - DO NOT CHANGE")))),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"Sample Config.js")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'apiURL: "http://localhost:8081",\nSSOURL: "http://localhost/restricted/index.html",\nlibrariesEndPoint: "/libraries",\nlibraryPageEndPoint: "/libraries/dbid"\n')),(0,o.kt)("h2",{id:"minify-stencil-frontend"},"Minify STENCIL-Frontend"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"cd stencil/frontend\nnpm run build\n")),(0,o.kt)("h2",{id:"deploy-stencil-frontend-to-nginx"},"Deploy STENCIL-frontend to NGINX"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"cp -r /build/* /usr/share/nginx/html\nsudo systemctl reload nginx\n")))}s.isMDXComponent=!0}}]);