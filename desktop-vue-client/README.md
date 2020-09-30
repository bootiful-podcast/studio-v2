# Editor View

![API](https://github.com/the-trump-dump/editor-view/workflows/API/badge.svg)

This project supports editing bookmarks. It's [based on Vue.js](https://vuejs.org/) and integrates with the Spring Boot-based backend in [`editor-api`](https://github.com/the-trump-dump/editor-api).

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Environment-Specific Configuration

There are two `.env.*` properties each containing environment-specific environment varaibles that get interpolated into the build thanks to Webpack. If you run `npm run build`, it'll pull in the variables defined in `.env.production`, and otherwise it'll pull in the environment variables from `.env`. 

### Previewing the Production Application

It's important that you serve the static JavaScript assets as an HTTP service. You can't just open it in your local browser relative to the filesystem. 

Build the application as usual (`npm run build`) and then serve it using any of a number of convenient utilities that serve static assets. 

I have a little Python script that serves the data from the application:

```
#!/bin/bash
p=${1:-8020}
d=${2:-$PWD}
echo $d 
cd $d 
python -m SimpleHTTPServer $p 
```


### Favicon.ico 

I used [this website](https://favicon.io/favicon-converter/) to take an [image](https://github.com/the-trump-dump/site-generator/blob/master/src/main/resources/static/Donald-GOP.png) and turn it into 
the `favicon.ico` for the site.
