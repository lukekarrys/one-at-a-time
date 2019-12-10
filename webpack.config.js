'use strict';

const path = require('path');
const makeWebpackConfig = require('hjs-webpack');
const html = require('html-tagged-literals');
const {remove} = require('lodash');
// Lets just use the webpack from hjs-webpack. Shhhh dont tell anyone
const webpack = require('webpack'); // eslint-disable-line import/no-extraneous-dependencies

const {UglifyJsPlugin} = webpack.optimize;
const {DefinePlugin} = webpack;

const env = process.env.NODE_ENV || 'development';
const isDev = env === 'development';
const minify = isDev ? false : env !== 'debug';

const renderHTML = (context) => html[isDev ? 'unindent' : 'minify']`
  <!DOCTYPE html>
  <html>
  <head>
    <title>One _____ At A Time</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="apple-mobile-web-app-title" content="One At A Time">
    <link rel="shortcut icon" href="/favicon.ico?v=100">
    <link rel="icon" href="/favicon.png?v=100">
    <link rel="icon" sizes="192x192" href="/favicon.png?v=100">
    <link rel="apple-touch-icon-precomposed" href="/favicon.png?v=100">
    <link rel="stylesheet" href="/${context.css}">
  </head>
  <body>
    <div id='root'></div>
    <script src="/${context.main}"></script>
  </body>
  </html>
`;

const config = makeWebpackConfig({
  isDev,
  'in': 'src/app.js',
  out: 'build',
  clearBeforeBuild: true,
  output: {hash: minify},
  hostname: 'localhost',
  html: (context) => ({
    _redirects: ['/*', '/index.html', '200'].join('   '),
    'index.html': renderHTML(context)
  })
});

const merge = (...sources) => Object.assign({}, ...sources);

const replaceLoader = (match, options) => {
  config.module.rules.forEach((loader) => {
    if (loader && loader.use) {
      const matchedIndex = loader.use.findIndex((usedLoader) => (usedLoader.loader || usedLoader) === match);
      const matchedLoader = loader.use[matchedIndex];
      if (matchedLoader) {
        loader.use[matchedIndex] = typeof matchedLoader === 'string'
          ? {loader: matchedLoader, options}
          : merge(matchedLoader, {
            options: merge(matchedLoader.options || {}, options)
          });
      }
    }
  });
};

replaceLoader('css-loader', {
  minimize: minify ? {discardComments: {removeAll: true}} : false
});

config.resolve.alias = {
  l: path.resolve(__dirname, 'src', 'lib'),
  c: path.resolve(__dirname, 'src', 'components'),
  co: path.resolve(__dirname, 'src', 'containers'),
  a: path.resolve(__dirname, 'src', 'actions'),
  p: path.resolve(__dirname, 'src', 'pages')
};

if (!minify) {
  remove(config.plugins, (p) => p instanceof DefinePlugin);
  remove(config.plugins, (p) => p instanceof UglifyJsPlugin);
}

module.exports = config;
