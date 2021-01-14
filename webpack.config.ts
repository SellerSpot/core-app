import path from 'path';
import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import { getEnvironmentVariables } from './src/config/dotenv';
import webpack from 'webpack';

const webpackConfiguration = (env: {
    production?: boolean;
    development?: boolean;
}): Configuration => {
    const isProduction = env.production ? true : false;
    const envVariables = getEnvironmentVariables(isProduction);
    return {
        entry: './src',
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
            plugins: [
                new TsconfigPathsPlugin({
                    extensions: ['.ts', '.tsx', '.js', '.css', '.module.css'],
                }),
            ],
            fallback: {
                path: require.resolve('path-browserify'),
                fs: require.resolve('fs'),
            },
        },
        output: {
            path: path.join(__dirname, '/dist'),
            filename: 'index.js',
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true,
                    },
                    exclude: [/dist/, /node_modules/],
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                        },
                    ],
                },
                {
                    test: /\.(css|scss)$/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                modules: {
                                    localIdentName: '[name]__[local]___[hash:base64:5]',
                                },
                            },
                        },
                    ],
                    include: /\.module\.css$/,
                },
                {
                    test: /\.(css|scss)$/,
                    use: ['style-loader', 'css-loader'],
                    exclude: /\.module\.css$/,
                },
            ],
        },
        plugins: [
            new webpack.DefinePlugin(envVariables), // setting environment variables 
            new HtmlWebpackPlugin({
                inject: true,
                template: path.join(__dirname, '/public/index.html'),
            }),
            new ForkTsCheckerWebpackPlugin({
                eslint: {
                    files: './src',
                },
            }),
        ],
        devServer: {
            port: 8000,
            open: true,
            hot: false,
            contentBase: 'public',
            publicPath: '/',
            historyApiFallback: true,
        },
        devtool: !isProduction ? 'source-map' : false,
    };
};

export default webpackConfiguration;
