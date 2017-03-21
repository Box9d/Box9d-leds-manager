var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var FaviconsWebpackPlugin = require('favicons-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist",
        publicPath: ""
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            { test: /\.js$/, loader: "source-map-loader" },
            { test: /\.scss$/, loaders: ["style-loader", "css-loader", "sass-loader"] },
            { test: /\.css$/, loaders: ["style-loader", "css-loader"] },
            { test: /\.(eot|svg|ttf|woff|woff2)$/, loader: "file-loader?name=public/fonts/[name].[ext]" },
            { test: /\.(png)$/, loader: "file-loader?name=public/img/[name].[ext]" }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 8000,
            proxy: 'http://localhost:8080/'
        },
            {
                reload: true
            }),
        new FaviconsWebpackPlugin('./src/assets/favicon.png'),
        new HtmlWebpackPlugin({
            template: './src/index.template.ejs',
            inject: 'body',
        }),
        new webpack.ProvidePlugin({
            'React': 'react',            
            'ReactDOM': 'react-dom',
        })
    ]
};