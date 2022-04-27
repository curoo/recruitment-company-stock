const webpack = require('webpack');

module.exports = {
    mode: "development",

    entry: ["./website/js/index.js"],

    output: {
        path: __dirname + "/static",
        filename: "bundle.js",
    },

    plugins: [
        new webpack.DefinePlugin({
            "process.env.API_URL": JSON.stringify("http://127.0.0.1:5000"),
        }),
    ],

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env']
                    }
                }
            },
        ]
    },
};
