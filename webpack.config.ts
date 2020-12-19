import path from 'path';
import webpack, { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import packageJson from './package.json';

const webpackConfiguration = (env: {
    production: boolean;
    development: boolean;
}): Configuration => {
    const isProduction = env.production ? true : false;
    return {
        entry: './src',
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
            plugins: [new TsconfigPathsPlugin()],
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
                'process.env.NODE_ENV': isProduction ? 'production' : 'development',
                'process.env.APP_NAME': JSON.stringify(packageJson.name),
                'process.env.APP_VERSION': JSON.stringify(packageJson.version),
            }),
            new ForkTsCheckerWebpackPlugin({
                eslint: {
                    files: './src',
                },
            }),
        ],
        devServer: {
            port: 8000,
            contentBase: 'dist',
            publicPath: 'dist',
        },
        devtool: !isProduction ? 'source-map' : false,
    };
};

export default webpackConfiguration;
