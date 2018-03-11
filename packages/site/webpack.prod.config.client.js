const path = require('path');
const webpack = require('webpack');
const nib = require('nib');
const jeet = require('jeet');
const rupture = require('rupture');
const foovar = require('foovar');
const MinifyPlugin = require('babel-minify-webpack-plugin');

module.exports = {
    entry: [
        './src/index.js',
    ],

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build', 'dist'),
        publicPath: '/dist/',
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [
                    'babel-loader',
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.(html)$/,
                use: 'raw-loader'
            },
            {
                test: /\.(png|eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader?name=[name].[ext]'
            },
            {
                test: /\.styl$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'stylus-loader'
                    },
                ],
            }
        ],
    },

    plugins: [
        new webpack.HashedModuleIdsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new MinifyPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                stylus: {
                    use: [nib(), jeet(), rupture(), foovar()]
                },
                context: '/'
            }
        }),
    ]
};
