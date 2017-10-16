// PROD WEBPACK ENVIRONMENT
var path = require('path');
var webpack = require('webpack');

var webpackMerge = require('webpack-merge');
const commonWebpackConfig = require('./webpack_common_config.js');

var CompressionPlugin = require("compression-webpack-plugin");


module.exports = function(env) {
    return webpackMerge(commonWebpackConfig(), {
        plugins: [
            new webpack.LoaderOptionsPlugin({
                minimize: false,
                debug: false
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            new webpack.optimize.UglifyJsPlugin({
                mangle: {
                    keep_fnames: true
                },
                sourceMap: false
            }),
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