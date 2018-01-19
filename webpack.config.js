var webpack = require("webpack"),
    autoprefixer = require("autoprefixer"),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    path = require('path'),
    root = function (__path) {
        return path.join(__dirname, 'dist');
    };

module.exports = function (env) {
    return {
        devtool: env.NODE_ENV == 'development' ? '#eval' : false,
        entry: {
            "vendors": "./webpack.vendors",
            "bundle": "./src/app"
        },
        resolve: {
            extensions: ['.ts', '.js'],
            modules: [
                path.resolve('./src'),
                path.resolve('./node_modules')
            ]
        },
        plugins: [
            new ExtractTextPlugin('css/[name].min.css'),

            // Takes care of warnings described at https://github.com/angular/angular/issues/11580
            new webpack.ContextReplacementPlugin(
                /(.+)?angular(\\|\/)core(.+)?/, root('./src'), {}
            ),
            new webpack.optimize.UglifyJsPlugin({
                minimize: true,
                sourceMap: false,
                compress: {
                    unused: true,
                    dead_code: true,
                    drop_debugger: true,
                    conditionals: true,
                    evaluate: false,
                    drop_console: true,
                    sequences: true,
                    booleans: true,
                    warnings: false
                },
                comments: false
            })
        ],
        output: {
            filename: 'js/[name].min.js',
            path: path.join(__dirname, 'dist')
        },
        module: {
            rules: [
                {
                    test: /\.ts/,
                    loader: 'ts-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.js$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            compact: false,
                            presets: ['babel-preset-env']
                        }
                    }
                },
                {
                    test: /\.html$/,
                    use: [ {
                        loader: 'html-loader',
                        options: {
                            minimize: true,
                            removeAttributeQuotes: false
                        }
                    }]
                },
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    use: [
                        'url-loader?limit=300&name=img/[name].[ext]',
                        'img-loader'
                    ]
                },
                {
                    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'url-loader?name=fonts/[name].[ext]'
                },
                {
                    test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    loader: 'file-loader?name=fonts/[name].[ext]'
                },
                {
                    test: /\.(css|scss)$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader'
                            },
                            {
                                loader: 'sass-loader'
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    ident: 'postcss',
                                    plugins: function () {
                                        return [
                                            autoprefixer
                                        ];
                                    }
                                }
                            }
                        ]
                    })
                }
            ]
        }
    }
};