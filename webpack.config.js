const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpackConfig = {
    entry: './src/index.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js"
    },
    module: {
        rules: [
            { test: /\.jsx$/, use: 'babel-loader' },
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
