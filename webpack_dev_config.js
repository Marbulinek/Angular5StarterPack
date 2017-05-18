// DEV WEBPACK ENVIRONMENT
var path = require('path');

var webpackMerge = require('webpack-merge');
const commonWebpackConfig = require('./webpack_common_config.js');


module.exports = function(env) {
    return webpackMerge(commonWebpackConfig(), {
        watch: true,
        devtool: 'inline-source-map'
        // output: {
        //     filename: '[name].js',
        //     path: path.resolve(__dirname, '../../dist')
        // }
    })
}