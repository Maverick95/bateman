const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
    },
    module: {
        rules: [
            {
                test: /\.[tj]sx?$/,
                use: 'babel-loader',
            },
            {
                test: /\.s?css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [ new HtmlWebpackPlugin({
        template: './src/index.html',
    })],
    mode: 'development',
    resolve: {
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.scss'],
    },
};