"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[326],{3905:function(e,t,a){a.d(t,{Zo:function(){return p},kt:function(){return u}});var r=a(7294);function o(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function n(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?n(Object(a),!0).forEach((function(t){o(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):n(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,r,o=function(e,t){if(null==e)return{};var a,r,o={},n=Object.keys(e);for(r=0;r<n.length;r++)a=n[r],t.indexOf(a)>=0||(o[a]=e[a]);return o}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(r=0;r<n.length;r++)a=n[r],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(o[a]=e[a])}return o}var s=r.createContext({}),d=function(e){var t=r.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},p=function(e){var t=d(e.components);return r.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},h=r.forwardRef((function(e,t){var a=e.components,o=e.mdxType,n=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),h=d(a),u=o,m=h["".concat(s,".").concat(u)]||h[u]||c[u]||n;return a?r.createElement(m,i(i({ref:t},p),{},{components:a})):r.createElement(m,i({ref:t},p))}));function u(e,t){var a=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var n=a.length,i=new Array(n);i[0]=h;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:o,i[1]=l;for(var d=2;d<n;d++)i[d]=a[d];return r.createElement.apply(null,i)}return r.createElement.apply(null,a)}h.displayName="MDXCreateElement"},921:function(e,t,a){a.r(t),a.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return d},toc:function(){return p},default:function(){return h}});var r=a(7462),o=a(3366),n=(a(7294),a(3905)),i=["components"],l={sidebar_position:2,id:"tutorial",title:"Example extending STENCIL tutorial",sidebar_label:"Development tutorial"},s=void 0,d={unversionedId:"STENCIL Development/tutorial",id:"STENCIL Development/tutorial",title:"Example extending STENCIL tutorial",description:"---",source:"@site/docs/STENCIL Development/expansion.md",sourceDirName:"STENCIL Development",slug:"/STENCIL Development/tutorial",permalink:"/stencil/docs/STENCIL Development/tutorial",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/STENCIL Development/expansion.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,id:"tutorial",title:"Example extending STENCIL tutorial",sidebar_label:"Development tutorial"},sidebar:"tutorialSidebar",previous:{title:"Coding Guidelines",permalink:"/stencil/docs/STENCIL Development/codingguidelines"},next:{title:"Galaxy integration",permalink:"/stencil/docs/STENCIL Development/galaxy"}},p=[{value:"Add the components to STENCIL",id:"add-the-components-to-stencil",children:[{value:"Checklist for the <em>chart</em>.js file.",id:"checklist-for-the-chartjs-file",children:[],level:4},{value:"Checklist for ImageArrays.js",id:"checklist-for-imagearraysjs",children:[],level:4},{value:"Checklist for librariesController.js",id:"checklist-for-librariescontrollerjs",children:[],level:4}],level:3}],c={toc:p};function h(e){var t=e.components,a=(0,o.Z)(e,i);return(0,n.kt)("wrapper",(0,r.Z)({},c,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("hr",null),(0,n.kt)("h1",{id:"overview-for-adding-a-nivo-chart"},"Overview for adding a ",(0,n.kt)("em",{parentName:"h1"},"nivo")," chart"),(0,n.kt)("p",null,"This tutorial after you have installed necessary packages, and you can see the existing charts. This also assumes you have database installed and you can experiment with mongoDB such as dropping the database, viewing the database for experimental purposes. Later on when data is being posted to database, you should be able to see the data there or drop the database and post it again."),(0,n.kt)("p",null,"To add the charts in the stencil app, one should be familiar with APIs and methods in Nivo. Nivo documentation has a lot of details on it but most important thing to consider are"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"nivo Components"),(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},"Install each component as required."),(0,n.kt)("li",{parentName:"ul"},"Look into the parameters that are to be provided."),(0,n.kt)("li",{parentName:"ul"},"Some of the parameters are by default provided while others are required."),(0,n.kt)("li",{parentName:"ul"},"Check the data format of the input.")))),(0,n.kt)("p",null,"Add (install) the chart component in the package.json to install it and make it available to use later on as well."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre"},"npm install\n")),(0,n.kt)("h3",{id:"add-the-components-to-stencil"},"Add the components to STENCIL"),(0,n.kt)("p",null,"Navigate to ",(0,n.kt)("strong",{parentName:"p"},"STENCIL > frontend > src > Components > Charts")),(0,n.kt)("p",null,"Some of the charts are already added there. Similar to these charts, make a new javascript file for adding the component for the intended chart."),(0,n.kt)("p",null,"For example: ",(0,n.kt)("em",{parentName:"p"},"StreamPlot_stencil.js")),(0,n.kt)("h4",{id:"checklist-for-the-chartjs-file"},"Checklist for the ",(0,n.kt)("em",{parentName:"h4"},"chart"),".js file."),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},"Import appropriate function for example ",(0,n.kt)("inlineCode",{parentName:"li"},"Stream")," and ",(0,n.kt)("inlineCode",{parentName:"li"},"ResponsiveStream")," for Stream Nivo component and create a function to check for data and pass it."),(0,n.kt)("li",{parentName:"ol"},"The CardContent and/or FullScreenDialog should be provided props.ChartData and props.ChartOptions. The props are made available through a json file from Stencil backend."),(0,n.kt)("li",{parentName:"ol"},"Export the function created.")),(0,n.kt)("p",null,"Navigate to ",(0,n.kt)("strong",{parentName:"p"},"STENCIL > frontend > src > Components > Sections")),(0,n.kt)("p",null,"ImageArray.js builds all the png images declared on the Charts folder. For every chart type, we will have to import the functions exported earlier. Add a case for the chart in the grid object as provided already for number of other charts."),(0,n.kt)("h4",{id:"checklist-for-imagearraysjs"},"Checklist for ImageArrays.js"),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},"Always check if the props object are populated with data and options or not. Usually, if these are not provided you will see error or na.png file as a default chart rendered."),(0,n.kt)("li",{parentName:"ol"},"Check for item, size, stepid as well. Refer to src/Config.js for different stepID configurations for different layouts available in the Stencil. This will also give different error if the StepID is not configured properly."),(0,n.kt)("li",{parentName:"ol"},"Very rarely, the component could not fetch the data from backend for which you should look into showLibrary.js. Appropriate console.log on that file is already put to see whether or not data is being fetched from the backend. Confirm that you see the chartdata and chartOptions here as well.")),(0,n.kt)("p",null,"Navigate to ",(0,n.kt)("strong",{parentName:"p"},"STENCIL > backend > sampleData > LocalData")),(0,n.kt)("p",null,"This folder will have the data file needed to create the image. Each of the component require different file structures and parameters. Consult to Nivo website and existing files for the already created charts."),(0,n.kt)("p",null,"Prettyprint options online or on your editor can help navigate the json provided.\nFor example, in ",(0,n.kt)("strong",{parentName:"p"},"STENCIL > backend > sampleData > localdata > ENCODE > AS > streamplot.json"),", we can see nested structure with \u2018chartOptions\u2019 and \u2018chartdata\u2019 provided. These are used to create the props. Any errors regarding props maybe traced to the parameters and the file provided for the intended chart function."),(0,n.kt)("p",null,"Consult ",(0,n.kt)("em",{parentName:"p"},"nivo")," website documentation for the parameters to provide, how they should be provided and the parameters( default values and input required ones)"),(0,n.kt)("p",null,"Once the data is provided, we need a way to tell the backend the layout details required for creating the charts. The layout details, charts data, options are all provided by the backend to frontend."),(0,n.kt)("p",null,"Create another file or an entry on the file, for example, sampleData/ATAC-seq_DESeq2 2.json provide details on your project, charts data type, stepid etc. be extra careful on how stepId should be provided for your layout ID. In the URL, provide where the Data file where chartOptions and ChartData were loaded for your chart. The data type should match as well for the type of chart which should match with options and data format it needs."),(0,n.kt)("p",null,"Before that we need to register the Data in the Controller module in stencil/backend/api/controllers/librariesController.js  Here for each item/chart , we build a URL. Find the code where it is building the URL. Similar to case \u201cstreamplot\u201d, add the case for your chart."),(0,n.kt)("h4",{id:"checklist-for-librariescontrollerjs"},"Checklist for librariesController.js"),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},"Make sure the case is added for your chart and the datatype match with the datatype declared on the props.")),(0,n.kt)("p",null,"Navigate to ",(0,n.kt)("strong",{parentName:"p"},"STENCIL > backend > utils")),(0,n.kt)("p",null,"This folder has utility functions needed to post data to the Database. Every time any change on the data files included on the LocalData, this should be run to see the update. Update on the frontend such as dimensions etc are live in React but the updates involving the data and sessions are to be reloaded by rebuilding the build process from the beginning."),(0,n.kt)("p",null,"In post_all.sh bash script the python commands are provided to post the data. Find your data either in ENCODE or AS or any other subfolders in the localdata folder."))}h.isMDXComponent=!0}}]);