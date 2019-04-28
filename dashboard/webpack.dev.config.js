const webpack = require('webpack');
const path = require('path');

var parentDir = path.join(__dirname, './');

module.exports = {
    entry: [
        path.join(parentDir, 'index.js')
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.s?css$/,
                use: [
                    require.resolve('style-loader'),
                    {
                        loader: require.resolve('a-css-loader'),
                        options: {
                            mode: 'local',
                            modules: true,
                            camelize: true,
                            minimize: {
                                zindex: false,
                                reduceIdents: false,
                            },
                        },
                    },
                    {
                      loader: 'sass-loader',
                    },
                ],
            }
        ]
    },
    output: {
        path: parentDir + 'dist',
        filename: 'bundle.js'
    },
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        contentBase: parentDir,
        historyApiFallback: true
    }
}
