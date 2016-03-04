/* eslint-env node */

const makeWebpackConfig = require('hjs-webpack');
const html = require('html-tagged-literals');
const cssnano = require('cssnano');
const path = require('path');
const remove = require('lodash').remove;
const webpack = require('webpack');

const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const DefinePlugin = webpack.DefinePlugin;

const isDev = (process.argv[1] || '').indexOf('hjs-dev-server') !== -1;
const debug = process.env.NODE_ENV === 'debug';
const minify = isDev ? false : !debug;

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
  out: 'public',
  clearBeforeBuild: true,
  output: {hash: minify},
  hostname: 'localhost',
  replace: {
    config: `src/config/${isDev ? 'development' : 'production'}.js`
  },
  html: renderHTML
});

config.postcss.push(cssnano({
  normalizeUrl: false,
  core: minify,
  discardComments: {removeAll: minify}
}));

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
