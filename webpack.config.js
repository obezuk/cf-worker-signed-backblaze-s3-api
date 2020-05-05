const webpack = require('webpack');

module.exports = {
    entry: "./worker.js",
    mode: "development",
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'ACCESS_KEY_ID': JSON.stringify("${ACCESS_KEY_ID}"),
                'SECRET_ACCESS_KEY': JSON.stringify("${SECRET_ACCESS_KEY}"),
                'TARGET_BUCKET_HOSTNAME': JSON.stringify("${TARGET_BUCKET_HOSTNAME}")
            }
        })
    ],
    optimization: {
        minimize: false
    },
    performance: {
        hints: false
    },
    output: {
        path: __dirname + "/dist",
        publicPath: "dist",
        filename: "worker.js"
    }
};