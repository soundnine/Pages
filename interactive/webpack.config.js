import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const config = {
    entry: './ts/index.ts',
    devtool: 'inline-source-map',
    target: 'web',
    devServer: {
        contentBase: path.resolve(dirname, 'dist'),
        compress: true,
        hot: false,
        historyApiFallback: true,
        liveReload: true,
        open: true,
        port: 5500,
        watchContentBase: true,
        watchOptions: {
        poll: 1000,
        ignored: /node_modules/,
        },
    },

    module: {
        rules: [
            {
                test: /\.babelrc$/,
                exclude: /(node_modules|pages)/,
                use: {
                    loader: 'babel-loader'
                },
            },

            {
                test: /\.ts$/,
                exclude: /(node_modules|pages)/,
                use: {
                    loader: 'ts-loader'
                },
            }
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({ template: './dist/index.html' }), 
    ],

    output: {
        filename: 'bundle.js',
        path: path.resolve(dirname, 'dist'),
        clean: true
    },

    resolve: {
        extensions: ['.js', '.ts']
    }
};

export default config;