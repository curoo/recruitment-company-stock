module.exports = {
    mode: "development",

    entry: ["./website/js/index.js"],

    output: {
        path: __dirname + "/static",
        filename: "bundle.js",
    },

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
