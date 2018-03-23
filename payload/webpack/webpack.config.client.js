const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const HtmlWebPackPlugin = require( 'html-webpack-plugin' );
const fs = require( 'fs' );
const lessToJs = require( 'less-vars-to-js' );
const path = require( 'path' );
const webpack = require( 'webpack' );

const dotenv = require( 'dotenv' );

dotenv.config();

const projectTitle = process.env.PROJECT_TITLE;
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

const prodPlugs = [
  new HtmlWebPackPlugin( {
    favicon  : 'src/client/assets/favicon.ico',
    filename : 'index.html',
    template : './src/client/index.html',
    title    : projectTitle || 'configure env PROJECT_TITLE',
  } ),
  extractSass,
  extractLess,
  extractCSS,
];
const devPlugs = [ new webpack.HotModuleReplacementPlugin(), ];

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
    { test : /\.(sass|scss)$/,
      use  : extractSass.extract( { fallback : 'style-loader',
                                    use      : [
          { loader  : 'css-loader',
            options : {
              importLoaders : 2,
              modules       : true,
              sourceMap     : !isProd,
            }, },
          { loader  : 'postcss-loader',
            options : { sourceMap: !isProd, }, },
          { loader  : 'sass-loader',
            options : { modules   : true,
                        sourceMap : !isProd, }, },
        ], } ), },
    { test : /\.less$/,
      use  : extractLess.extract( { fallback : 'style-loader',
                                    use      : [
          { loader  : 'css-loader',
            options : { sourceMap: !isProd, }, },
          { loader  : 'postcss-loader',
            options : { sourceMap: !isProd, }, },
          { loader  : 'less-loader',
            options : {
              javascriptEnabled : true,
              modifyVars        : themeVariables,
              sourceMap         : !isProd,
            }, },
        ], } ), },
    { test : /\.css$/,
      use  : extractCSS.extract( { fallback : 'style-loader',
                                   use      : [
          { loader  : 'css-loader',
            options : {
              importLoaders : 1,
              modules       : true,
              sourceMap     : !isProd,
            }, },
          { loader  : 'postcss-loader',
            options : { sourceMap: !isProd, }, },
        ], } ), },
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
  plugins: [
    ...prodPlugs,
    ...isProd ? [] : devPlugs,
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
