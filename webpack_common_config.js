// COMMON WEBPACK ENVIRONMENT
var webpack = require('webpack');
var path = require('path');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

let pathsToClean = ['dist'];
let cleanOptions = 
{
    root: ('./dist'),
    verbose: true
}

module.exports = function(env) {
    return {
        entry: {
            app: './main.ts',
            vendor: './vendor.ts',
            polyfills: './polyfills.ts'
        },
        output: {
            filename: '[name].js',
            path: root('./dist'),
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.css']
        },
        module: {
            loaders: [
                {
                    test: /\.tsx?$/,
                    loader: 'awesome-typescript-loader'
                },
                {
                    test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                    loader: 'file-loader?emitFile=false&name=[path][name].[ext]',
                    options: {
                        limit: 10000
                    }
                },
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract(
                        {
                            fallback: 'style-loader',
                            use: 'css-loader',
                        }
                    )
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(pathsToClean, cleanOptions),
            new webpack.ContextReplacementPlugin(
                // Angular4 workaround
                /angular(\\|\/)core(\\|\/)@angular/,
                root('./application'),
                {}
            ),
            new ExtractTextPlugin({
                filename: 'styles.bundle.css',
                allChunks: true
            }),
            new CopyWebpackPlugin([
                { from: './configs/application-environment.json', to: './angular_conf' },
                { from: './configs/config.development.json', to: './angular_conf' },
                { from: './configs/config.production.json', to: './angular_conf' }
            ]),
            new HtmlWebpackPlugin({
                files: {
                    "css" : ["styles.bundle.css"]
                },
                hash: true,
                inject: 'body',
                cache: false,
                template: './my-index.ejs'
            })
        ]
    }
}
function root(__path) {
    return path.join(__dirname, __path);
}