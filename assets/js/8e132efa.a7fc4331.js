"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[323],{3905:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>h});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var s=n.createContext({}),u=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},c=function(e){var t=u(e.components);return n.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,i=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=u(r),h=o,m=d["".concat(s,".").concat(h)]||d[h]||p[h]||i;return r?n.createElement(m,a(a({ref:t},c),{},{components:r})):n.createElement(m,a({ref:t},c))}));function h(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=r.length,a=new Array(i);a[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:o,a[1]=l;for(var u=2;u<i;u++)a[u]=r[u];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},1519:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>a,default:()=>p,frontMatter:()=>i,metadata:()=>l,toc:()=>u});var n=r(7462),o=(r(7294),r(3905));const i={sidebar_position:1,id:"codingguidelines",title:"Coding Guidelines",sidebar_label:"Coding Guidelines"},a=void 0,l={unversionedId:"STENCIL Development/codingguidelines",id:"STENCIL Development/codingguidelines",title:"Coding Guidelines",description:"---",source:"@site/docs/STENCIL Development/guidelines.md",sourceDirName:"STENCIL Development",slug:"/STENCIL Development/codingguidelines",permalink:"/stencil/docs/STENCIL Development/codingguidelines",draft:!1,editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/STENCIL Development/guidelines.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,id:"codingguidelines",title:"Coding Guidelines",sidebar_label:"Coding Guidelines"},sidebar:"tutorialSidebar",previous:{title:"Deployment preparations",permalink:"/stencil/docs/Production Deployment/Ubuntu 20.04/deploystart"},next:{title:"Development tutorial",permalink:"/stencil/docs/STENCIL Development/tutorial"}},s={},u=[{value:"Contributing",id:"contributing",level:2},{value:"Before you Begin",id:"before-you-begin",level:2},{value:"Reporting a new issue",id:"reporting-a-new-issue",level:2},{value:"How to Contribute",id:"how-to-contribute",level:2},{value:"Attribution &amp; Acknowledgements",id:"attribution--acknowledgements",level:2}],c={toc:u};function p(e){let{components:t,...r}=e;return(0,o.kt)("wrapper",(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("hr",null),(0,o.kt)("h2",{id:"contributing"},"Contributing"),(0,o.kt)("p",null,"STENCIL welcomes new development! This document briefly describes best practices for contributing to the STENCIL repository."),(0,o.kt)("h2",{id:"before-you-begin"},"Before you Begin"),(0,o.kt)("p",null,"If you have an idea for a feature to add or an approach for a bugfix, it is best to communicate with STENCIL developers early. The primary venue for this is the GitHub issue tracker. Browse through existing GitHub issues and if one seems related, comment on it."),(0,o.kt)("h2",{id:"reporting-a-new-issue"},"Reporting a new issue"),(0,o.kt)("p",null,"If no existing STENCIL issue seems appropriate, a new issue can be opened using this form."),(0,o.kt)("h2",{id:"how-to-contribute"},"How to Contribute"),(0,o.kt)("p",null,"All changes to the STENCIL repository should be made through pull requests (with just two exceptions outlined below)."),(0,o.kt)("p",null,"If you are new to Git, the Software Carpentry's Version Control with Git tutorial is a good place to start. More learning resources are listed at ",(0,o.kt)("a",{parentName:"p",href:"https://help.github.com/en/github/getting-started-with-github/git-and-github-learning-resources"},"https://help.github.com/en/github/getting-started-with-github/git-and-github-learning-resources")),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Make sure you have a free GitHub account. To increase the security of your account, we strongly recommend that you configure two-factor authentication. Additionally, you may want to sign your commits.")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Fork the PEGR repository on GitHub to make your changes. To keep your copy up to date with respect to the main repository, you need to frequently sync your fork:"))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"git remote add upstream https://github.com/CEGRcode/stencil\ngit fetch upstream\ngit checkout dev\ngit merge upstream/dev\n")),(0,o.kt)("ol",{start:3},(0,o.kt)("li",{parentName:"ol"},"Choose the correct branch to develop your changes against.")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"The ",(0,o.kt)("strong",{parentName:"li"},"master")," branch is kept in sync with the latest tagged release, but should not be used as the base (i.e. target) branch of a pull request."),(0,o.kt)("li",{parentName:"ul"},"Additions of new features to the codebase should be based off the dev branch (git checkout -b feature_branch dev), with few exceptions."),(0,o.kt)("li",{parentName:"ul"},"Most bug fixes should target the oldest supported release exhibiting the issue (git checkout -b bugfix_branch release_XX.XX)."),(0,o.kt)("li",{parentName:"ul"},"Serious security problems should not be fixed via pull request.")),(0,o.kt)("ol",{start:4},(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"If your changes modify code please ensure the resulting files conform to the code conventions Google Style Guide for MongoDB, React, JavaScript, and HTML respectively.")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Please run any existing tests that seem relevant. And if possible, also try to add new tests for the features added or bugs fixed by your pull request."),(0,o.kt)("p",{parentName:"li"},"Developers reviewing your pull request will be happy to help you add or run the relevant tests as part of the pull request review process.")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Write a useful and properly formatted commit message. Follow these guidelines and template, in particular start your message with a short imperative sentence on a single line, possibly followed by a blank line and a more detailed explanation."),(0,o.kt)("p",{parentName:"li"},"In the detailed explanation it's good to include relevant external references (e.g. GitHub issue fixed) using full URLs, and errors or tracebacks the commit is supposed to fix. You can use the Markdown syntax for lists and code highlighting, wrapping the explanation text at 72 characters when possible.")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Commit and push your changes to your fork.")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Open a pull request with these changes. Your pull request message ideally should include:"))),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Why you made the changes (e.g. references to GitHub issues being fixed)."),(0,o.kt)("li",{parentName:"ul"},"A description of the implementation of the changes."),(0,o.kt)("li",{parentName:"ul"},"How to test the changes, if you haven't included specific tests already.")),(0,o.kt)("ol",{start:9},(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"The pull request should pass all the continuous integration tests which are automatically started by GitHub using e.g. Travis CI.")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"If, before your pull request is merged, conflicts arise between your branch and the target branch (because other commits were pushed to the target branch), you need to either:"))),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"rebase your branch on top of the target branch, or")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"merge the target branch into your branch."),(0,o.kt)("p",{parentName:"li"},"We recommend the first approach (i.e. rebasing) because it produces cleaner git histories, which are easier to bisect. If your branch is called feature_branch and your target branch is dev, you can rebase your branch with the following commands:"))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"git checkout feature_branch\ngit pull\ngit fetch upstream\ngit rebase upstream/dev\n")),(0,o.kt)("p",null,"  Once you have resolved the conflicts in all commits of your branch, you can force-push the rebased branch to update the pull request:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"git push --force\n")),(0,o.kt)("h2",{id:"attribution--acknowledgements"},"Attribution & Acknowledgements"),(0,o.kt)("p",null,"These coding guidelines are based on the Galaxy community coding guidelines."))}p.isMDXComponent=!0}}]);