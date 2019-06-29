const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackConfig = {
    entry: {
        app:'./src/index.tsx'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
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
            template: "src/assets/index.html"
        })
    ]
};

module.exports=webpackConfig;
