"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[562],{3905:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>d});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},s=Object.keys(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var p=n.createContext({}),l=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},c=function(e){var t=l(e.components);return n.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,s=e.originalType,p=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),m=l(r),d=a,y=m["".concat(p,".").concat(d)]||m[d]||u[d]||s;return r?n.createElement(y,i(i({ref:t},c),{},{components:r})):n.createElement(y,i({ref:t},c))}));function d(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var s=r.length,i=new Array(s);i[0]=m;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o.mdxType="string"==typeof e?e:a,i[1]=o;for(var l=2;l<s;l++)i[l]=r[l];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},631:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>u,frontMatter:()=>s,metadata:()=>o,toc:()=>l});var n=r(7462),a=(r(7294),r(3905));const s={sidebar_position:6,id:"apiaccess",title:"API access",sidebar_label:"API access"},i=void 0,o={unversionedId:"STENCIL Development/apiaccess",id:"STENCIL Development/apiaccess",title:"API access",description:"---",source:"@site/docs/STENCIL Development/apiaccess.md",sourceDirName:"STENCIL Development",slug:"/STENCIL Development/apiaccess",permalink:"/stencil/docs/STENCIL Development/apiaccess",draft:!1,editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/STENCIL Development/apiaccess.md",tags:[],version:"current",sidebarPosition:6,frontMatter:{sidebar_position:6,id:"apiaccess",title:"API access",sidebar_label:"API access"},sidebar:"tutorialSidebar",previous:{title:"Configure layouts",permalink:"/stencil/docs/STENCIL Development/layout"},next:{title:"Coding Guidelines",permalink:"/stencil/docs/STENCIL Development/mongodb"}},p={},l=[{value:"API Access",id:"api-access",level:2},{value:"postLibrary.py",id:"postlibrarypy",level:3},{value:"Example usage:",id:"example-usage",level:4},{value:"deleteLibrary.py",id:"deletelibrarypy",level:3},{value:"Example usage:",id:"example-usage-1",level:4},{value:"getLibraries.py",id:"getlibrariespy",level:3},{value:"Example usage:",id:"example-usage-2",level:4}],c={toc:l};function u(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("hr",null),(0,a.kt)("h2",{id:"api-access"},"API Access"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"STENCIL NodeJS backend is accessible programmatically"),(0,a.kt)("li",{parentName:"ul"},"Example scripts for accessing STENCIL are provided in ",(0,a.kt)("em",{parentName:"li"},"/backend/utils"))),(0,a.kt)("h3",{id:"postlibrarypy"},"postLibrary.py"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"#!/usr/bin/python\n\nimport argparse\nimport json\nimport requests\n\n# reference : https://realpython.com/python-requests/\n\nif __name__ == '__main__':\n\n    parser = argparse.ArgumentParser(\n        description='Inserts JSON into backend using the POST request')\n    parser.add_argument('jsonFile', help='Library data in JSON format')\n    args = parser.parse_args()\n\n    URL = \"http://localhost:8081/libraries\"\n\n    # Reading the example.json\n    f=open(args.jsonFile, 'r')\n    value = json.load(f)\n    f.close()\n\n    response = requests.post(URL, json=value, verify=False)\n    print(f\"STATUS: {response.status_code}  \\nReason: {response.reason} \\nMessage: {response.content}\")\n")),(0,a.kt)("h4",{id:"example-usage"},"Example usage:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"python3 postLibrary.py libraryData.json\n")),(0,a.kt)("h3",{id:"deletelibrarypy"},"deleteLibrary.py"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Deletes library in STENCIL given libraryID and projectID"),(0,a.kt)("li",{parentName:"ul"},"Token must equal SVC_STENCIL_PWD")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'#!/usr/bin/python\n\nimport pprint\nimport json\nimport requests\nimport sys\n\n# reference : https://realpython.com/python-requests/\n\nif __name__ == \'__main__\':\n\n    URL = "http://localhost/libraries/libid/"\n\n    projectId = sys.argv[1]\n    libraryId = sys.argv[2]\n\n    token = "XXXXXX"\n\n    deleteURL = f"{URL}/{token}/{projectId}/{libraryId}"\n    response = requests.delete(deleteURL)\n    pprint.pprint(response.json())\n')),(0,a.kt)("h4",{id:"example-usage-1"},"Example usage:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"python3 deleteLibrary.py projectID libraryID\n")),(0,a.kt)("h3",{id:"getlibrariespy"},"getLibraries.py"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Retrieves ALL data in STENCIL in JSON format"),(0,a.kt)("li",{parentName:"ul"},"Token must equal SVC_STENCIL_PWD")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'#!/usr/bin/python\n\nimport argparse\nimport pprint\nimport requests\n\n# reference : https://realpython.com/python-requests/\n\nif __name__ == \'__main__\':\n\n    token = "XXXXXX"\n\n    URL = "http://localhost/libraries/all/"+ token\n\n    # making a GET request for all the samples.\n    print("\\n GET data \\n")\n    response = requests.get(URL,verify=False)\n    pprint.pprint(response.json())\n')),(0,a.kt)("h4",{id:"example-usage-2"},"Example usage:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"python3 getLibraries.py > ALL_DATA.json\n")))}u.isMDXComponent=!0}}]);