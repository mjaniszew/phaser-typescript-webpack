const path = require('path');

const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const prodConfig = require('./webpack.production.js');
const devConfig = require('./webpack.development.js');

const NODE_ENV = process.env.NODE_ENV ||
    (process.env.npm_lifecycle_event === 'build') ? 'production' : 'development';

// Phaser webpack config
const phaserModule = path.join(__dirname, '/node_modules/phaser-ce/');
const phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
const pixi = path.join(phaserModule, 'build/custom/pixi.js');
const p2 = path.join(phaserModule, 'build/custom/p2.js');

const commonConfig = {
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "/build")
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".js"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Phaser TS boilerplate",
            template: path.join(__dirname, 'src/index.tpl'),
        }),
        new CopyWebpackPlugin([{
            from: path.join(__dirname, '/src/resources'),
            to: "resources"
        }])
    ],
    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            { test: /\.ts?$/, loader: "ts-loader" },
            { test: /pixi\.js/, loader: 'expose?PIXI' },
            { test: /phaser-split\.js$/, loader: 'expose?Phaser' },
            { test: /p2\.js/, loader: 'expose?p2' }
        ]
    },
    resolve: {
        alias: {
            'phaser': phaser,
            'pixi': pixi,
            'p2': p2
        }
    }
};

module.exports = merge(commonConfig, (NODE_ENV === 'development') ? devConfig : prodConfig);
