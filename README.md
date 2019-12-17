# src

> Vue Nuxt lnu prject

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

## Initial setup
# Create database specified in ecosystem.config.js
```
db:create:[dev|prod]
```


# Production build and launch server. Creates .nuxt folder and starts pm2 process for the app.
$ npm run build
$ npm start


## serve with hot reload ar host:port specified in ecosystem.config.js. In development mode it start two servers on different ports:
# 1) Nuxt frontend server 
# 2) Express backend server 
$ npm run dev

# To start only frontend server use
$ npm run frontend:dev

# To start only backend server (backend rest API server) use
$ npm run backend:dev


```


## Helper commands
`
npm install                            # install and make build (install all dependencies from package.json)
npm run prod                           # run process manager (run "prod" task from package.json)
pm2 list                               # list all processes
pm2 monit                              # monitoring all processes launched
pm2 logs --lines 15                    # displaying logs of all processes in real-time
`

# Run node task for process manager in development

npm run dev                            # shortcut for launching pm2 process. Starts lnu-app application
                                       # (run "dev" task from package.json)
`
watch: if files are changes then server restarts automatically
ignore-watch: folders and files to ignore on watch
`

# Microservice
`
pm2 stop lnu-app                     # stop application using pm2 with name "lnu-app"
pm2 start lnu-app                    # start application using pm2 with name "lnu-app"
pm2 delete lnu-app                   # remove application using pm2 with name "lnu-app"
pm2 startOrRestart lnu-app           # start or restart application using pm2 with name "lnu-app"
`

# Installing nvm optionally
sudo apt-get update
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
# Reconnect via ssh and then
nvm install 8.9.1

# npm not found server problem https://github.com/Unitech/pm2/issues/2138
# quick fix move lines on top in ~/.bashrc
#   export NVM_DIR="$HOME/.nvm"
#   [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm

------------------------
#pm2 help 
Commands:
    setup                run remote setup commands
    update               update deploy to the latest release
    revert [n]           revert to [n]th last deployment or 1
    curr[ent]            output current release commit
    prev[ious]           output previous release commit
    exec|run <cmd>       execute the given <cmd>
    list                 list previous deploy commits
    [ref]                deploy to [ref], the “ref” setting, or latest tag

For detailed explanation on how things work, checkout the 
[Nuxt.js docs](https://github.com/nuxt/nuxt.js)
[PM2 docs](http://pm2.keymetrics.io/docs/usage/quick-start/)

For linux machines install libfontconfig1 and libxrender1 packages (Required for PDF generation)

To restore clean database run "psql -U %db_user% -h %db_host% -d lnu-app -f ./scripts/lnu-app.bak"
