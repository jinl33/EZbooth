const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    mode: 'development',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: {
                    transpileOnly: true,
                    onlyCompileBundledFiles: true,
                }
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    devServer: {
        open: true,
        static: {
            directory: path.resolve(__dirname, 'dist'),  // Serve files from `dist`
        },
        port: 8080,
        hot: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ],
    output: {
        filename: 'bundle.js',  // Ensures JavaScript output for browser compatibility
        path: path.resolve(__dirname, 'dist')
    }
};