import path from 'path';
import fs from 'fs';
import { Configuration, DefinePlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import { getEnvironmentVariables } from './src/config/dotenv';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const webpackConfiguration = (env: {
    production?: boolean;
    development?: boolean;
    analyze?: boolean;
    story?: boolean;
}): Configuration => {
    const isProduction = !!env.production;
    const isAnalyze = !!env.analyze;
    const isStory = !!env.story;
    const envVariables = getEnvironmentVariables(isProduction);
    const devPort = Number(JSON.parse(envVariables['process.env.PORT']));
    const resolve = isStory
        ? {
              extensions: ['.ts', '.tsx', '.js'],
              plugins: [
                  new TsconfigPathsPlugin({
                      extensions: ['.ts', '.tsx', '.js', '.css', '.module.css'],
                  }),
              ],
          }
        : {
              extensions: ['.ts', '.tsx', '.js'],
              plugins: [
                  new TsconfigPathsPlugin({
                      extensions: ['.ts', '.tsx', '.js', '.css', '.module.css'],
                  }),
              ],
          };
    return {
        entry: './src',
        resolve,
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
                    test: /\.(png|jpe?g|gif|svg|ttf|woff|woff2)$/i,
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
                        {
                            loader: 'sass-loader',
                        },
                        {
                            loader: 'sass-resources-loader',
                            options: {
                                resources: require(path.join(
                                    process.cwd(),
                                    'src/styles/__library.ts',
                                )),
                            },
                        },
                    ],
                    include: /\.module\.(css|scss)$/,
                },
                {
                    test: /\.(css|scss)$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'sass-loader',
                        {
                            loader: 'sass-resources-loader',
                            options: {
                                resources: require(path.join(
                                    process.cwd(),
                                    'src/styles/__library.ts',
                                )),
                            },
                        },
                    ],
                    exclude: /\.module\.(css|scss)$/,
                },
            ],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new DefinePlugin(envVariables), // setting environment variables
            new HtmlWebpackPlugin({
                inject: true,
                template: path.join(__dirname, '/public/index.html'),
                favicon: path.join(__dirname, '/public/favicon.ico'),
            }),
            new ForkTsCheckerWebpackPlugin({
                eslint: {
                    files: './src',
                },
            }),
            isAnalyze ? new BundleAnalyzerPlugin({ analyzerMode: 'static' }) : new DefinePlugin({}),
        ],
        devServer: {
            port: devPort,
            open: true,
            hot: true,
            injectHot: true,
            contentBase: 'public',
            publicPath: '/',
            historyApiFallback: true,
            host: 'app.dev.sellerspot.in',
            allowedHosts: ['app.dev1.sellerspot.in'],
            https: {
                key: fs.readFileSync('./security/_wildcard.sellerspot.in+5-key.pem'),
                cert: fs.readFileSync('./security/_wildcard.sellerspot.in+5.pem'),
            },
        },
        devtool: !isProduction ? 'eval-source-map' : false,
    };
};

export default webpackConfiguration;
