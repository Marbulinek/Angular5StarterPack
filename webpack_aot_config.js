// PROD WEBPACK ENVIRONMENT
var path = require('path');
var webpack = require('webpack');

var webpackMerge = require('webpack-merge');
const commonWebpackConfig = require('./webpack_common_config.js');

var CompressionPlugin = require("compression-webpack-plugin");
var OptimizeJsPlugin = require('optimize-js-plugin');
var AngularCompilerPlugin = require("@ngtools/webpack").AngularCompilerPlugin;

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';



module.exports = function (env) {
    return webpackMerge(commonWebpackConfig(), {
        mode: 'production',

        entry: {
            polyfills: './polyfills.ts',
            app: './main-aot.ts'
        },


        optimization: {
            runtimeChunk: {
                name: "manifest"
            },
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "vendors",
                        priority: -20,
                        chunks: "all"
                    }
                }
            }
        },

        
        module: {
            rules: [
                {
                    test: /\.tsx$/,
                    loader: "@ngtools/webpack"
                }
            ]
        },

        plugins: [
            
            new webpack.DefinePlugin({
                'process.env': {
                    'ENV': JSON.stringify(ENV)
                }
            }),

            new AngularCompilerPlugin({
                tsConfigPath: './tsconfig-aot.json',
                entryModule: root('application/app.module#AppModule')
            }),

            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            }),

            /** Webpack plugin to optimize javascript file for faster initial load
             *  by wrapping eagerly-invoked functions
            */
            new OptimizeJsPlugin({
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