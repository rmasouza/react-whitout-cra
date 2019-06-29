'use strict';
const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest')

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
            template: "assets/index.html",
            favicon: 'assets/icon.ico'
        }),
        new WorkboxWebpackPlugin.GenerateSW({
            clientsClaim: true,
            importWorkboxFrom: 'cdn',
        }),
        new WebpackPwaManifest({
            name: 'My Progressive Web App',
            short_name: 'MyPWA',
            description: 'My awesome Progressive Web App!',
            background_color: '#fff',
            theme_color: '#fff',
            display: 'standalone',
            start_url: ".",
            orientation: "portrait",
            icons: [
                {
                    src: path.resolve('src/assets/icon.png'),
                    sizes: [192, 256, 512],
                    ios: true
                }
            ],
            ios: {
                // 'apple-touch-icon': string | IosAppleTouchIcon,
                // 'apple-touch-startup-image': string,
                'apple-mobile-web-app-title': 'MyPWA',
                'apple-mobile-web-app-capable': true,
                'apple-mobile-web-app-status-bar-style':  'black'
            },
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
