const path = require('path');

module.exports = {
    entry: path.join(__dirname, '/src/typescript/main.ts'),
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    devServer: {
        contentBase: path.join(__dirname, '/build'),
        outputPath: path.join(__dirname, '/build'),
        inline: true
    },
    module: {
        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    }
};
