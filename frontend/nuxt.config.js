const pkg = require("../package");

module.exports = {
  srcDir: __dirname,//srcDir option is required if you want to place nuxt in a sub folder
  buildDir: process.env.NUXT_BUILD_DIR,

  // The folloving config will replace all process.env.baseUrl with values passed in env variables to compile frontend with this values
  env: {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    NUXT_HOST: process.env.NUXT_HOST,
    NUXT_PORT: process.env.NUXT_PORT,
    API_BASE_URL: process.env.API_BASE_URL,
    PUBLIC_APP_PORT: process.env.PUBLIC_APP_PORT,

    TOKEN_NAME_HEADER: process.env.TOKEN_NAME_HEADER,
    TOKEN_NAME_COOKIE: process.env.TOKEN_NAME_COOKIE,
    AJAX_REQUEST_NAME_HEADER: process.env.AJAX_REQUEST_NAME_HEADER,
    AJAX_REQUEST_VALUE_HEADER: process.env.AJAX_REQUEST_VALUE_HEADER,
    APP_VERSION_NAME_HEADER: process.env.APP_VERSION_NAME_HEADER,

    APP_VERSION: process.env.APP_VERSION,
    APP_REVISION: process.env.APP_REVISION,
    APP_NAME: process.env.APP_NAME,
    APP_DESCRIPTION: process.env.APP_DESCRIPTION,
    FRONTEND_ROLLBAR_TOKEN: process.env.FRONTEND_ROLLBAR_TOKEN,
  },

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      {
        charset: "utf-8"
      }, {
        name: "viewport",
        content: "width=device-width, initial-scale=1"//, user-scalable=no
      }, {
        hid: "description",
        name: "description",
        content: pkg.description
      }, {
        "http-equiv": "X-UA-Compatible",
        content: "IE=edge"
      }
    ],
    link: [
      {
        rel: "icon",
        type: "image/png",
        href: "/favicon.png"
      }
    ]
  },
  css: [
    {
      src: "~/scss/main.scss",
      lang: "scss"
    }
  ],
  noscript: [
    {
      innerHTML: "Your browser doesn`t have JavaScript support!"
    }
  ],

  /*
  ** Customize the progress bar color
  */
  loading: {
    name: "chasing-dots",
    color: "#FF5638",
    background: "white",
    height: "4px"
  },

  /*
  ** Router configuration
  */
  router: {
    linkActiveClass: "is-active",// Bootstrap link active style
    middleware: [
      "auth"
    ],

    /*, scrollBehavior(to, from, savedPosition) {
      //console.log("scrollBehavior");
      // set scroll to top on changing page
      return {
        x: 0,
        y: 0
      };
    }*/
  },

  /*
  ** Build configuration
  */
  /*build: {
    extractCSS: true// Adding this option breaks automatical css reloading
    //For module visual analyzing and deduplicate module loaded multiple times
    //analyze: true
  },*/

  plugins: [
    {
      src: "~/plugins/initToken.js",
      ssr: false
    }, {
      src: "~/plugins/svgIcon.js",
    }, {
      src: "~/plugins/vueRipple.js",
      ssr: false
    }, {
      src: "~/plugins/vueSelect.js",
      ssr: false
    }, {
      src: "~/plugins/vueTippy.js",
      ssr: false
    }, {
      src: "~/plugins/vueRollbar.js",
      ssr: true
    }, {
      src: "~/plugins/vueCarousel.js",
      ssr: false
    }
  ]
};