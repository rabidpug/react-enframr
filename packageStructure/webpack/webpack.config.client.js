const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const HtmlWebPackPlugin = require( 'html-webpack-plugin' );
const fs = require( 'fs' );
const lessToJs = require( 'less-vars-to-js' );
const path = require( 'path' );
const webpack = require( 'webpack' );

const themeVariables = lessToJs( fs.readFileSync(
  path.resolve( 'theme.less' ), 'utf8'
) );
const ENV = process.env.NODE_ENV;
const isProd = ENV === 'production';
const extractSass = new ExtractTextPlugin( { disable  : !isProd,
                                             filename : 'styles/[name].styles.css', } );
const extractLess = new ExtractTextPlugin( { disable  : !isProd,
                                             filename : 'styles/[name].theme.css', } );
const extractCSS = new ExtractTextPlugin( { disable  : !isProd,
                                            filename : 'styles/[name].other.css', } );

module.exports = {
  entry: { index: isProd
    ? [
      'babel-polyfill',
      './src/client/index.js',
    ]
    : [
      'babel-polyfill',
      'webpack-hot-middleware/client',
      './src/client/index.js',
    ], },
  mode   : isProd ? 'production' : 'development',
  module : { rules: [
    {
      exclude : /node_modules/,
      loader  : 'babel-loader',
      test    : /\.js$/,
    },
    {
      exclude : /node_modules/,
      loader  : 'babel-loader',
      test    : /\.jsx$/,
    },
    { test : /\.html$/,
      use  : [
        { loader  : 'html-loader',
          options : { minimize: isProd, }, },
      ], },
    { test : /\.(sass|scss)$/,
      use  : extractSass.extract( { fallback : 'style-loader',
                                    use      : [
          { loader  : 'css-loader',
            options : { modules   : true,
                        sourceMap : !isProd, }, },
          { loader  : 'sass-loader',
            options : { sourceMap: !isProd, }, },
        ], } ), },
    { test : /\.less$/,
      use  : extractLess.extract( { fallback : 'style-loader',
                                    use      : [
          { loader  : 'css-loader',
            options : { camelCase : true,
                        sourceMap : !isProd, }, },
          { loader  : 'less-loader',
            options : {
              javascriptEnabled : true,
              modifyVars        : themeVariables,
              sourceMap         : !isProd,
            }, },
        ], } ), },
    { test : /\.css$/,
      use  : extractCSS.extract( { fallback : 'style-loader',
                                   use      : [ { loader: 'css-loader', }, ], } ), },
    {
      loader  : require.resolve( 'url-loader' ),
      options : { limit : 10000,
                  name  : 'assets/[name].[hash:8].[ext]', },
      test: [
        /\.bmp$/,
        /\.gif$/,
        /\.svg$/,
        /\.jpe?g$/,
        /\.png$/,
        /\.ttf$/,
        /\.woff$/,
        /\.woff2$/,
        /\.eot$/,
      ],
    },
  ], },
  optimization: { splitChunks: { cacheGroups: { commons: {
    chunks : 'all',
    name   : 'vendor',
    test   : /[\\/]node_modules[\\/]/,
  }, }, }, },
  output: {
    filename   : 'js/[name].bundle.js',
    path       : path.resolve( 'dist' ),
    publicPath : '/',
  },
  plugins: isProd
    ? [
      new HtmlWebPackPlugin( { filename : 'index.html',
                               template : './src/client/index.html', } ),
      extractSass,
      extractLess,
      extractCSS,
    ]
    : [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebPackPlugin( { filename : 'index.html',
                               template : './src/client/index.html', } ),
      extractSass,
      extractLess,
      extractCSS,
    ],
  resolve: { alias: {
    Assets: path.resolve(
      'src', 'client', 'assets'
    ),
    Client: path.resolve(
      'src', 'client'
    ),
    Components: path.resolve(
      'src', 'client', 'components'
    ),
    Containers: path.resolve(
      'src', 'client', 'containers'
    ),
    Routes: path.resolve(
      'src', 'client', 'routes'
    ),
    Scenes: path.resolve(
      'src', 'client', 'scenes'
    ),
    Server: path.resolve(
      'src', 'server'
    ),
    Shared: path.resolve(
      'src', 'shared'
    ),
    Store: path.resolve(
      'src', 'client', 'store'
    ),
  },
             extensions: [
      '.less',
      '.js',
    ], },
  // watch: !isProd,
};
