import path from 'path';
import webpack, {Configuration} from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import {TsconfigPathsPlugin} from 'tsconfig-paths-webpack-plugin';
import packageJson from './package.json';

const webpackConfiguration = (env): Configuration => ({
    entry: './src',
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        plugins: [new TsconfigPathsPlugin()],
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'build.js',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                },
                exclude: /dist/,
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '/public/index.html'),
        }),
        new webpack.DefinePlugin({
            'process.env.PRODUCTION': env.production ?? false,
            'process.env.NAME': packageJson.name,
            'process.env.VERSION': packageJson.version,
        }),
        new ForkTsCheckerWebpackPlugin({
            eslint: {
                files: 'src',
            },
        }),
    ],
    devServer: {
        publicPath: '/',
    },
});

export default webpackConfiguration;
