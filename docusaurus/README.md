# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Local Development

```
$ cd website && npm install && npm start
```

This command starts a local development server and open up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

```
$ GIT_USER=<YOUR-GIT-USERNAME> CURRENT_BRANCH=master npm run publish-gh-pages
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
