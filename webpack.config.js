const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

const sourcePath = path.join(__dirname, 'src');

const config = {
    entry: {
        app: path.resolve(sourcePath, 'app.js'),
    },
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public/index.html'),
            title: 'Yojma React Konva',
        }),

        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],
    resolve: {
        modules: [path.resolve(sourcePath, 'app'), path.resolve(__dirname, 'node_modules')],
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: [ {
                loader: 'babel-loader',
                options: {
                    compact: true,
                }
            } ],
            exclude: /node_modules/,
        }, {
            test: /\.s?css$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 2,
                        sourceMap: true
                    }
                }, {
                    loader: 'postcss-loader',
                    options: {
                        // plugins: () => [
                        //     require('autoprefixer')
                        // ],
                        sourceMap: true
                    }
                }, {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                }
            ],
        }],
    },
    output: {
        pathinfo: true,
        publicPath: '/',
        filename: '[name].js'
    }
};

// production
if (process.env.NODE_ENV === 'production') {
    config.devtool = false;
    config.plugins.push( new CleanWebpackPlugin(['dist']) )

    config.output = {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    }
}

module.exports = config;
