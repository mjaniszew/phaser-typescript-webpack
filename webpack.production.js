const path = require('path');

const webpack = require("webpack");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: path.join(__dirname, '/src/typescript/main.ts'),
        vendor: [
           'pixi',
           'p2',
           'phaser'
        ]
    },
    output: {
        filename: '[name].[chunkhash].js',
        // we need to add an ID from MD5hash plugin since webpack
        // is not creating chunkhashes properly when app code has changed
        // one line of code changes in app -> both app and vendor files have new hashes
        chunkFilename: '[chunkhash].[id].chunk.js'
    },
    plugins: [
        new CleanWebpackPlugin(['build']),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor']
        })
    ]
};
