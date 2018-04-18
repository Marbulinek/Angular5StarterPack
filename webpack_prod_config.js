// PROD WEBPACK ENVIRONMENT
var path = require('path');
var webpack = require('webpack');

var webpackMerge = require('webpack-merge');
const commonWebpackConfig = require('./webpack_common_config.js');

var CompressionPlugin = require("compression-webpack-plugin");

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';



module.exports = function (env) {
    return webpackMerge(commonWebpackConfig(), {
        mode: 'production',
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'ENV': JSON.stringify(ENV)
                }
            }),
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            }),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.optimize.AggressiveMergingPlugin(),
            new CompressionPlugin({
                asset: "[path].gz[query]",
                algorithm: "gzip",
                test: /\.js$|\.css$|\.html$/,
                threshold: 10240,
                minRatio: 0.8
            })
        ]
    })
}
function root(__path) {
    return path.join(__dirname, __path);
}