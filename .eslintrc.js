module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 8,
    sourceType: "module"
  },
  extends: [
    "eslint:recommended",
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    "plugin:vue/recommended"
  ],

  // required to lint *.vue files
  plugins: [
    "vue"
  ],

  // Add your custom rules here
  rules: {
    //"nuxt/no-cjs-in-config": "off",//todo check
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "double"
    ],
    "semi": [
      "error",
      "always"
    ],
    curly: [
      "error",
      "all"
    ],
    "brace-style": [
      2
    ],
    "no-lone-blocks": "error",
    "no-multi-spaces": "error",
    "no-control-regex": 0,
    "space-before-function-paren": [
      "error", {
        "anonymous": "always",
        "named": "never",
        "asyncArrow": "always"
      }
    ],
    "keyword-spacing": [
      "error",
      {
        "before": true,
        "after": true
      }
    ],
    "space-before-blocks": [
      "error",
      {
        "functions": "always",
        "keywords": "always",
        "classes": "always"
      }
    ],
    "key-spacing": [
      2,
      {
        "singleLine": {
          "beforeColon": false,
          "afterColon": true
        },
        "multiLine": {
          "beforeColon": false,
          "afterColon": true
        }
      }
    ],
    "vue/html-closing-bracket-newline": [
      "error",
      {
        "singleline": "never",
        "multiline": "never"
      }
    ],
    "vue/html-closing-bracket-spacing": [
      "error",
      {
        "startTag": "never",
        "endTag": "never",
        "selfClosingTag": "never"
      }
    ],
    "space-infix-ops": [
      "error"
    ]
  }
};