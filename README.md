# Angular 5 starter kit with Typescript and Webpack

### Setup

- npm install
- npm run webpack-prod (Build into production)
- npm run webpack-dev (Run into dev mode with watcher)

### Structure

    |- Root directory
    |
    |-- app
    |--|
        ... Project files
    |-- dist directory
    |--|
        ... Files of bundle
    |-- node modules
    |--|
        ... Libraries
    |-- index.html (example file)
    |-- package.json
    |-- package.lock.json
    |-- readme.md
    |-- tsconfig.ts
    |-- weback.config.js (file to manage webpack)
    |-- weback.wendors.js (list of packages to building: themes, bootstrap,e.t.c, don't including imported modules)


### Features

- Building separate vendors and bundle js and css files.
- Media files DON'T included in bundle (to minimize the initial load). Media is loaded in default HTML mode.
- The webpack.vendors.js file to specify the components for the assembly (do not load anything superfluous).
- Files of fonts and images are collected automatically. Links are also created automatically