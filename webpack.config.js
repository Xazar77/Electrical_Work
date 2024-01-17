const path = require('path') 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


const mode = process.env.NODE_ENV || 'development'
const devMode = mode === 'development'
const target = devMode ? 'web' : 'browserslist'
const devtool = devMode ? 'source-map' : undefined

module.exports = {
    mode, 
    target,
    devtool,
    devServer: {
        port: 2601,
        open: true,
        hot: true
    },
    context: path.resolve(__dirname, 'src'),
    entry: ['@babel/polyfill', './index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/[name][ext]'
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.(c|sa|sc)ss$/i,
                use: [
                    devMode? 'style-loader' : MiniCssExtractPlugin.loader, 
                    "css-loader",
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [require('postcss-preset-env')]
                            }
                        }
                    },
                    "sass-loader"
                ],
              },
              {
                test: /\.(woff2|woff|eot|ttf|svg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]'
                }
              },
              {
                test: /\.(jpe?g|png|webp|gif|svg)$/i,
                use: [
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                              progressive: true,
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                              enabled: false,
                            },
                            pngquant: {
                              quality: [0.65, 0.90],
                              speed: 4
                            },
                            gifsicle: {
                              interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                              quality: 75
                            }
                        }
                    }
                ],
                type: 'asset/resource',
                generator: {
                    filename: 'image/[name][ext]'
                }
              },

              {
                test: /\.(?:js|mjs|cjs)$/i,
                exclude: /(node_modules | bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: [
                      ['@babel/preset-env', { targets: "defaults" }]
                    ]
                  }
                }
              }
        ],
    },
    plugins: [
      new HtmlWebpackPlugin({
          template: './index.html'
          // filename: 'index.[contenthash].html',
      }),
      new MiniCssExtractPlugin({
          filename: '[name].[contenthash].css',
      }),
    ],

};