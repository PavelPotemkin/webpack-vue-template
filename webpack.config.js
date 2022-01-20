const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const BundleAnalyzer = require('webpack-bundle-analyzer')
const ESLintPlugin = require('eslint-webpack-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')
const {VueLoaderPlugin} = require('vue-loader')
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

const webpack = require('webpack')
const hbsData = require('./hbs-data.js')

const {NODE_ENV, HOST, PORT} = process.env
const isDev = NODE_ENV === 'development'
const mode = isDev ? 'development' : 'production'
const host = HOST || 'localhost'
const port = PORT || 8080

const buildDirectory = isDev ? 'dist' : 'build'
const useHashInFileNames = false

const paths = {
  src: path.resolve(__dirname, 'src'),
  html: path.resolve(__dirname, 'src', 'assets', 'html'),
  assets: path.resolve(__dirname, 'src', 'assets'),
  vue: path.resolve(__dirname, 'src', 'vue'),
  build: path.resolve(__dirname, buildDirectory)
}

const entry = {
  main: path.resolve(paths.src, 'main.ts'),
  vue: path.resolve(paths.vue, 'index.ts')
}

glob.sync('**/*.ts', {
  cwd: path.resolve(paths.src, 'pages')
}).forEach(file => {
  const chunkName = file.split('.')[0]

  entry[chunkName] = path.resolve(paths.src, 'pages', file)
})

const stylesUseRule = [
  isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
  {
    loader: 'css-loader',
    options: {
      sourceMap: false,
      importLoaders: 2
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      sourceMap: false,
    }
  },
  {
    loader: 'sass-loader',
    options: {
      sourceMap: false,
    }
  }
]

const config = {
  entry,
  output: {
    filename: (!isDev && useHashInFileNames) ? 'js/[name].[contenthash].bundle.js' : 'js/[name].bundle.js',
    path: paths.build,
    clean: true,
    chunkFilename: 'js/[name].[contenthash:8].js'
  },
  cache: {
    type: 'filesystem'
  },
  devtool: isDev ? 'inline-source-map' : false,
  target: 'web',
  stats: {
    children: true
  }, 
  mode,
  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
    rules: [
      {
        test: /\.mjs$/,
        type: 'javascript/auto',
        include: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          cache: true
        }
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              cache: true,
              extract: true,
              spriteFilename: useHashInFileNames ? 'sprite.[hash].svg' : 'sprite.svg',
              esModule: false,
              runtimeGenerator: require.resolve(path.resolve(paths.src, 'plugins', 'svg-sprite-generator.js')),
              publicPath: ''
            }
          },
          'svgo-loader'
        ]
      },
      {
        test: /\.s?([ca])ss$/,
        oneOf: [
          {
            resourceQuery: /module/,
            use: stylesUseRule
          },
          {
            resourceQuery: /\?vue/,
            use: stylesUseRule
          },
          {
            test: /\.module\.\w+$/,
            use: stylesUseRule
          },
          {
            use: stylesUseRule
          }
        ]
      },
      {
        test: /\.m?jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          }
        ]
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              happyPackMode: true,
              appendTsxSuffixTo: [
                '\\.vue$'
              ],
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: useHashInFileNames ? 'img/[name].[hash][ext][query]' : 'img/[name][ext][query]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: useHashInFileNames ? 'fonts/[name].[hash][ext][query]' : 'fonts/[name][ext][query]'
        }
      },
      {
        test: /\.(mp4|ogg|webm)$/i,
        type: 'asset/resource',
        generator: {
          filename: useHashInFileNames ? 'video/[name].[hash][ext][query]' : 'video/[name][ext][query]'
        }
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        options: {
          helperDirs: [
            path.resolve(paths.html, 'helpers')
          ],
          partialDirs: [
            path.resolve(paths.html, 'includes')
          ],
          inlineRequires: '@/assets/'
        }
      }
    ]
  },
  resolve: {
    extensions: [
      '.tsx',
      '.ts',
      '.mjs',
      '.js',
      '.jsx',
      '.vue',
      '.json'
    ],
    alias: {
      '@': paths.src,
      assets: paths.assets,
      vue: '@vue/runtime-dom'
    },
    roots: [paths.src],
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        pathRewrite: { '^/api': '' },
      },
    },
    devMiddleware: {
      writeToDisk: true
    },
    static: path.join(__dirname, 'public'),
    compress: true,
    historyApiFallback: true,
    hot: false,
    https: false,
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: false,
      __VUE_PROD_DEVTOOLS__: false
    }),
    new ESLintPlugin({cache: true}),
    new StylelintPlugin({cache: true}),
    new SpriteLoaderPlugin({
      plainSprite: true
    }),
    new CopyPlugin({
      patterns: [
        {from: 'public'}
      ]
    }),
    ...glob.sync('**/*.hbs', {
      cwd: path.resolve(paths.html, 'views'),
      nodir: true
    }).map(file => new HtmlWebpackPlugin({
      filename: file.replace('.hbs', '.html'),
      template: path.resolve(paths.html, 'views', file),
      data: hbsData,
      chunks: [file.split('.')[0], 'main'],
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    })),
  ],
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  optimization: {
    runtimeChunk: 'single',
    emitOnErrors: true,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            arrows: false,
            collapse_vars: false,
            comparisons: false,
            computed_props: false,
            hoist_funs: false,
            hoist_props: false,
            hoist_vars: false,
            inline: false,
            loops: false,
            negate_iife: false,
            properties: false,
            reduce_funcs: false,
            reduce_vars: false,
            switches: false,
            toplevel: false,
            typeofs: false,
            booleans: true,
            if_return: true,
            sequences: true,
            unused: true,
            conditionals: true,
            dead_code: true,
            evaluate: true
          },
          mangle: {
            safari10: true
          }
        },
        parallel: true,
        extractComments: false
      }),
      new CssMinimizerPlugin(),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              [
                "svgo",
                {
                  name: 'preset-default',
                },
              ],
            ],
          },
        },
      }),
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: -20,
          name (module) {
            const package = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)

            return package ? `vendor.${package[1].replace('@', '')}` : ''
          },
          reuseExistingChunk: true
        },
        vueVendor: {
          test: /[\\/]node_modules[\\/](@vue|vue-router|vuex|vue-loader)[\\/]/,
          name: 'chunk.vue.vendor',
          chunks: 'initial',
          priority: -10,
          reuseExistingChunk: true
        }
      }
    }
  }
}

if (!isDev) {
  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: useHashInFileNames ? 'styles/[name].[contenthash].css' : 'styles/[name].css',
      chunkFilename: useHashInFileNames ? 'styles/[id].[contenthash].css' : 'styles/[id].css',
      ignoreOrder: false
    }),
    new BundleAnalyzer.BundleAnalyzerPlugin({
      analyzerMode: 'static',
      analyzerHost: host,
      analyzerPort: 8888
    })
  )
}

module.exports = config
