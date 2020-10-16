const path = require("path");
const dotenv = require("dotenv");

const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const WorkerPlugin = require("worker-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const webpackConfigFactory = async () => {
    dotenv.config();
    const sourcePath = path.join(__dirname, "./src");
    const assetsPath = path.join(__dirname, "./assets");

    console.log(path.resolve(sourcePath, "styles/index.scss"))
    return {
        target: ["web", "es2018"],
        mode: process.env.NODE_ENV,
        // devtool: "source-map",
        entry: {
            main: path.resolve(sourcePath, "pages/App.tsx"),
            about: path.resolve(sourcePath, "pages/About.tsx"),
        },
        output: {
            filename: "[name].[contenthash].js",
            chunkFilename: "[name]-[contenthash].js",
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".json"],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: "ts-loader",
                    exclude: /node_modules/,
                },

                {
                    test: /\.s[ac]ss$/i, // todo: add loader to critc css (ex: indec.sass) to add it inline (use include/exclude option)
                    exclude: path.resolve(sourcePath, "styles/index.scss"),
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        {
                            loader: "sass-loader",
                            options: {
                                sassOptions: {
                                    includePaths: [`${sourcePath}/styles`],
                                },
                                sourceMap: true,
                            },
                        },
                    ],
                },
                {
                    test: /\.s[ac]ss$/i, 
                    include: path.resolve(sourcePath, "styles"),
                    use: [
                        "style-loader",
                        "css-loader",
                        "sass-loader"
                    ],
                },
            ],
        },
        optimization: {
            minimizer: [
                new TerserPlugin({
                    test: /\.js(\?.*)?$/i,
                }),
                new CssMinimizerPlugin(),
            ],
            splitChunks: {
                chunks: "all",
            },
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: path.resolve(sourcePath, "assets/index.html"),
                favicon: path.resolve(sourcePath, "assets/icon.ico"),
                chunks: ["main"],
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(sourcePath, "assets/index.html"),
                favicon: path.resolve(sourcePath, "assets/icon.ico"),
                chunks: ["about"],
                filename: 'about/index.html',
            }),
            new MiniCssExtractPlugin({
                filename: "[name].[contenthash].css",
                chunkFilename: "[id].css",
            }),
            new WorkboxWebpackPlugin.GenerateSW({
                clientsClaim: true,
                runtimeCaching: [
                    {
                        urlPattern: /^https?.*/,
                        handler: "NetworkFirst",
                        options: {
                            cacheName: "MyPwaCache",
                            expiration: {
                                maxEntries: 200,
                            },
                        },
                    },
                ],
            }),
            new BundleAnalyzerPlugin({
                analyzerMode: "static",
                openAnalyzer: false,
            }),
            new WebpackPwaManifest({
                name: "My Progressive Web App",
                short_name: "MyPWA",
                description: "My Awesome Progressive Web App!",
                background_color: "#fff",
                theme_color: "#fff",
                display: "standalone",
                start_url: ".",
                orientation: "portrait",
                icons: [
                    {
                        src: path.resolve(sourcePath, "assets/icon.png"),
                        sizes: [192, 256, 512],
                        ios: true,
                    },
                ],
                ios: {
                    "apple-mobile-web-app-title": "MyPWA",
                    "apple-mobile-web-app-capable": true,
                    "apple-mobile-web-app-status-bar-style": "black",
                },
            }),
            new Dotenv({
                path: path.join(__dirname, "./.env"),
                systemvars: true,
            }),
            new WorkerPlugin(),
        ],
        devServer: {
            compress: true,
            port: process.env.PORT,
        },
    };
};

module.exports = webpackConfigFactory;
