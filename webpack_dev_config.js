// DEV WEBPACK ENVIRONMENT
var path = require('path');

var webpackMerge = require('webpack-merge');
var commonWebpackConfig = require('./webpack_common_config.js');
var CircularDependencyPlugin = require('circular-dependency-plugin')


module.exports = function (env) {
    return webpackMerge(commonWebpackConfig(),
        {
            mode: 'development',
            devtool: 'inline-source-map',
            plugins: [
                new CircularDependencyPlugin({
                    // exclude detection of files based on a RegExp 
                   exclude: /a\.js|node_modules/,
                   // add errors to webpack instead of warnings 
                   failOnError: true
                })
            ]
        }
   )
}