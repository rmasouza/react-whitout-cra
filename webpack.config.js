'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');


const sourcePath = path.join(__dirname, './src');
const outputhPath = path.resolve(__dirname, './dist');

const webpackConfig = {
    context: sourcePath,
    entry: {
        app:'./index.tsx'
    },
    output: {
        path: outputhPath,
        filename: "bundle.js"
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [
            { test: /\.(ts|js)x?$/, exclude: /node_modules/,  use: 'babel-loader' },
            { test: /\.css$/, use: [ 'bstyle-loader', 'css-loader' ] },
        ]
    },
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            template: "assets/index.html"
        }),
        new WorkboxWebpackPlugin.GenerateSW({
            clientsClaim: true,
            importWorkboxFrom: 'cdn',
        }),
    ],
    node: {
        module: 'empty',
        dgram: 'empty',
        dns: 'mock',
        fs: 'empty',
        http2: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty',
    },
};

module.exports=webpackConfig;
