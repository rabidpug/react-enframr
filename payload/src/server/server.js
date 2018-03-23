import config from '../../webpack/webpack.config.client';
import express from 'express';
import favicon from 'serve-favicon';
import { helloEndpointRoute, } from 'Shared/routes';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
const { NODE_ENV, } = process.env;
const app = express(),
  isDev = NODE_ENV !== 'production';

if ( isDev ) {
  const compiler = webpack( config );

  const HTML_FILE = path.resolve(
    compiler.outputPath, 'index.html'
  );

  app.use( webpackDevMiddleware(
    compiler, { publicPath: config.output.publicPath, }
  ) );

  app.use( webpackHotMiddleware( compiler ) );

  app.get(
    helloEndpointRoute(), (
      req, res
    ) => {
      res.json( { message: `Hello from the server! (received ${req.params.num})`, } );
    }
  );

  app.get(
    '*', (
      req, res, next
    ) => {
      compiler.outputFileSystem.readFile(
        HTML_FILE, (
          err, result
        ) => {
          if ( err ) return next( err );

          res.set(
            'content-type', 'text/html'
          );

          res.send( result );

          res.end();
        }
      );
    }
  );
} else {
  const HTML_FILE = path.resolve(
    __dirname, 'index.html'
  );

  app.use( favicon( path.resolve(
    __dirname, 'favicon.ico'
  ) ) );

  app.use( express.static( __dirname ) );

  app.get(
    helloEndpointRoute(), (
      req, res
    ) => {
      res.json( { message: `Hello from the server! (received ${req.params.num})`, } );
    }
  );

  app.get(
    '*', (
      req, res
    ) => {
      res.set(
        'content-type', 'text/html'
      );

      res.sendFile( HTML_FILE );
    }
  );
}

export default app;
