const path = require('path');
const fs = require("fs");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const ASSET_PATH = process.argv.find(v => v.indexOf('webpack-dev-server') !== -1) ? '' : '/dist';

function generateHtmlPlugins(templateDir) {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
  return templateFiles.map(item => {
    const parts = item.split(".");
    const name = parts[0];
    const extension = parts[1];
    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
      inject: false
    });
  });
}

const htmlPlugins = generateHtmlPlugins("./src/pages");

const config = {
  entry: {
    bundle: ["./src/js/index.js", "./src/scss/index.scss"]
  },
  output: {
    filename: './js/[name].js',
    publicPath: ASSET_PATH + '/',
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(scss|css)$/,
        exclude: /node_modules/,
        use: [ MiniCssExtractPlugin.loader, "css-loader", 'postcss-loader', "sass-loader", ],
      },
      {
        test: /\.(png|svg|jpg|gif|cur)$/,
        loader: 'file-loader',
        options: {
          publicPath: '../',
          name: 'images/[folder]/[name].[ext]'
        },
      },
      {
        test: /\.(ttf|otf|eot|woff|woff2|ico)$/,
        use: [{
          loader: "file-loader",
          options: {
            publicPath: '../',
            name: 'fonts/Montserrat/[folder]/[name].[ext]',
          }
        }]
      },
      {
        test: /\.html$/,
        include: path.resolve(__dirname, 'src/components'),
        use: ['raw-loader']
      },
      {
        test: /\.(path|svgs|glsl|vert|vs|fs)$/,
        exclude: /node_modules/,
        use: ['raw-loader']
      },

    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    disableHostCheck: true,
    open: true,
  },
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        }
      })
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[id]~[name].css',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new CopyWebpackPlugin([
      {
        from: "./src/fonts",
        to: "./fonts",
      },
      {
        from: "./src/favicon",
        to: "./favicon"
      },
      {
        from: "./src/images",
        to: "./images"
      }
    ])
  ].concat(htmlPlugins)
};

module.exports = (env, argv) => {
  if (argv.mode === "development") {
    config.plugins.push(new CleanWebpackPlugin());
  }
  if (env.product) {
    config.mode = "production";
    config.optimization.minimizer.push(new UglifyJsPlugin({
      test: /\.js(\?.*)?$/i,
    }));
  }
  config.plugins.push(new webpack.DefinePlugin({
    '__DEBUG__': JSON.stringify(env.devel || false),
    '__ASSET_PATH__': JSON.stringify(ASSET_PATH),
  }));
  return config;
};