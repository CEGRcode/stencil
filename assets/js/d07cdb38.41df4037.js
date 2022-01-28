"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[269],{3905:function(t,e,a){a.d(e,{Zo:function(){return u},kt:function(){return m}});var l=a(7294);function n(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function r(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);e&&(l=l.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,l)}return a}function i(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?r(Object(a),!0).forEach((function(e){n(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function o(t,e){if(null==t)return{};var a,l,n=function(t,e){if(null==t)return{};var a,l,n={},r=Object.keys(t);for(l=0;l<r.length;l++)a=r[l],e.indexOf(a)>=0||(n[a]=t[a]);return n}(t,e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);for(l=0;l<r.length;l++)a=r[l],e.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(t,a)&&(n[a]=t[a])}return n}var p=l.createContext({}),s=function(t){var e=l.useContext(p),a=e;return t&&(a="function"==typeof t?t(e):i(i({},e),t)),a},u=function(t){var e=s(t.components);return l.createElement(p.Provider,{value:e},t.children)},d={inlineCode:"code",wrapper:function(t){var e=t.children;return l.createElement(l.Fragment,{},e)}},c=l.forwardRef((function(t,e){var a=t.components,n=t.mdxType,r=t.originalType,p=t.parentName,u=o(t,["components","mdxType","originalType","parentName"]),c=s(a),m=n,y=c["".concat(p,".").concat(m)]||c[m]||d[m]||r;return a?l.createElement(y,i(i({ref:e},u),{},{components:a})):l.createElement(y,i({ref:e},u))}));function m(t,e){var a=arguments,n=e&&e.mdxType;if("string"==typeof t||n){var r=a.length,i=new Array(r);i[0]=c;var o={};for(var p in e)hasOwnProperty.call(e,p)&&(o[p]=e[p]);o.originalType=t,o.mdxType="string"==typeof t?t:n,i[1]=o;for(var s=2;s<r;s++)i[s]=a[s];return l.createElement.apply(null,i)}return l.createElement.apply(null,a)}c.displayName="MDXCreateElement"},5775:function(t,e,a){a.r(e),a.d(e,{frontMatter:function(){return o},contentTitle:function(){return p},metadata:function(){return s},toc:function(){return u},default:function(){return c}});var l=a(7462),n=a(3366),r=(a(7294),a(3905)),i=["components"],o={sidebar_position:1,id:"payload",title:"Galaxy POST command",sidebar_label:"Galaxy integration"},p=void 0,s={unversionedId:"STENCIL Guides/payload",id:"STENCIL Guides/payload",title:"Galaxy POST command",description:"---",source:"@site/docs/STENCIL Guides/payload.md",sourceDirName:"STENCIL Guides",slug:"/STENCIL Guides/payload",permalink:"/stencil/docs/STENCIL Guides/payload",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/STENCIL Guides/payload.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,id:"payload",title:"Galaxy POST command",sidebar_label:"Galaxy integration"},sidebar:"tutorialSidebar",previous:{title:"Docker",permalink:"/stencil/docs/Getting Started/docker"},next:{title:"Dynamic plot JSON format",permalink:"/stencil/docs/STENCIL Guides/dynamic"}},u=[{value:"Galaxy integration with STENCIL",id:"galaxy-integration-with-stencil",children:[],level:2},{value:"JSON payload",id:"json-payload",children:[],level:2},{value:"libraryData Array",id:"librarydata-array",children:[],level:2},{value:"Example Payload",id:"example-payload",children:[],level:2}],d={toc:u};function c(t){var e=t.components,a=(0,n.Z)(t,i);return(0,r.kt)("wrapper",(0,l.Z)({},d,a,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("hr",null),(0,r.kt)("h2",{id:"galaxy-integration-with-stencil"},"Galaxy integration with STENCIL"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Galaxy integration with STENCIL is facilitated by adding a simple python POST tool into a Galaxy workflow."),(0,r.kt)("li",{parentName:"ul"},"Example Galaxy scripts (with XML) to allow Galaxy to POST to STENCIL:",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://github.com/CEGRcode/galaxy_tools_for_stencil"},"https://github.com/CEGRcode/galaxy_tools_for_stencil"))))),(0,r.kt)("h2",{id:"json-payload"},"JSON payload"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"projectId")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"projectId is the highest level of categorizing the data in STENCIL."),(0,r.kt)("li",{parentName:"ul"},"STENCIL consists of many projects."),(0,r.kt)("li",{parentName:"ul"},"Each project consists of many samples and each sample consist of many libraries.")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"libraryType")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Type of the library that is POSTed to STENCIL."),(0,r.kt)("li",{parentName:"ul"},'Examples are "RNA-seq", "ATAC-seq", and "ChIP-seq".')),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"sampleId")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Name of the sample which the library belongs."),(0,r.kt)("li",{parentName:"ul"},"One sample can have multiple libraries."),(0,r.kt)("li",{parentName:"ul"},"An example of multiple libraries for a sample may be different replicates for a sample.")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"libraryId")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"An ID given to a library that is POSTed from Galaxy to STENCIL.")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"libraryDescription")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Optional free-form string description about the library")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"createdBy")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Username of the Galaxy account under which the library is POSTed.")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"createTimestamp")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"The time the library is originally POSTed to STENCIL")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"updatedBy")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Username of the Galaxy account under which the POST is updated.")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"updateTimestamp")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Timestamp from when the library was last updated.")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"token")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"API key that is used to verify permission to POST to Stencil"),(0,r.kt)("li",{parentName:"ul"},"This is defined in the backend's .env file under SVC_STENCIL_PWD")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"groupTag")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"An array of additional meta information associated with each library."),(0,r.kt)("li",{parentName:"ul"},"An example is Galaxy HistoryID where the associated data read by STENCIL resides.")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"libraryData")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"An array element containing the meta-information for each plot/chart/table/image POSTed to STENCIL."),(0,r.kt)("li",{parentName:"ul"},"The format of this element is detailed below.")),(0,r.kt)("h2",{id:"librarydata-array"},"libraryData Array"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"id")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"A unique id assigned to each dataset in Galaxy"),(0,r.kt)("li",{parentName:"ul"},"If a Galaxy historyID is POSTed to STENCIL using this parameter, the path to reproducibility is maintained")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"dataType")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Type of data to be visualized in STENCIL."),(0,r.kt)("li",{parentName:"ul"},"Examples are PNG, SVG, JPG, basictable, lineplot, barchart, scatterplot, heatmap")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"layoutId")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"This is the unique ID of the layoutID that this data should be applied to."),(0,r.kt)("li",{parentName:"ul"},"See ",(0,r.kt)("a",{parentName:"li",href:"/stencil/docs/STENCIL%20Guides/layout"},"Configure Layout")," for additional details.")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"layoutTitle")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"This is title for the layout section.")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"tabId")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Each Layout may consists of multiple Tabs."),(0,r.kt)("li",{parentName:"ul"},"This variable sets the displayed name of Tabs.")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"URL")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"URL of the location where STENCIL can access the data resides in Galaxy."),(0,r.kt)("li",{parentName:"ul"},"This can be any arbitrary URL")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"stepId")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Each Tab consists of multiple \u201cSteps\u201d."),(0,r.kt)("li",{parentName:"ul"},"Steps indicates where exactly in the Tab the data needs to be visualized.")),(0,r.kt)("h2",{id:"example-payload"},"Example Payload"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Example payload:")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'{\n  "projectId": "Yeast Epigenome Project",\n  "libraryType": "Meta-analysis",\n  "sampleId": "UMAP meta-analysis",\n  "libraryId": "UMAP",\n  "libraryDescription": "UMAP meta-analysis of all ChIP-exo data-sets generated in the Yeast Epigenome Project",\n  "createdBy": "cegr@cornell.edu",\n  "token": "SGAN9WTPAUCAYDO8A8HD",\n  "submitter": "cegr@cornell.edu",\n  "libraryData": [\n    {\n        "id": "UMAP_plot",\n        "dataType": "scatterplot",\n        "layoutId": "SingleChart",\n        "layoutTitle": "UMAP of Yeast Epigenome",\n        "tabId": "Scatter Plot",\n        "URL": "http://localhost:8081/localdata/YEP/UMAP/UMAP_scatterplot.json",\n        "stepId": "0"\n    },\n    {\n      "id": "UMAP_rawdata",\n        "dataType": "basictable",\n      "layoutId": "SingleChart",\n        "layoutTitle": "UMAP of Yeast Epigenome",\n      "tabId": "UMAP Data",\n      "URL": "http://localhost:8081/localdata/YEP/UMAP/UMAP_table.json",\n      "stepId": "0"\n    }\n  ]\n}\n')))}c.isMDXComponent=!0}}]);