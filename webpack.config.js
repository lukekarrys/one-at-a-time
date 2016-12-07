/* eslint-env node */

const path = require('path');
const makeWebpackConfig = require('hjs-webpack');
const html = require('html-tagged-literals');
const cssnano = require('cssnano');
const remove = require('lodash').remove;
const webpack = require('webpack');

const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const DefinePlugin = webpack.DefinePlugin;

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
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
      ga('create', 'UA-8402584-16', 'auto');
    </script>
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
