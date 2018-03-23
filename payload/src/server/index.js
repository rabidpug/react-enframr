import { Server, } from 'http';
import app from './server';

const { NODE_ENV, PORT, } = process.env;
const isDev = NODE_ENV !== 'production';

const SERVER_PORT = PORT || 8080;
const SERVER_HOST = PORT ? '0.0.0.0' : 'localhost';

const server = Server( app );
let currentApp = app;

server.listen(
  SERVER_PORT,
  SERVER_HOST,
  () => console.log(`listening on port ${SERVER_PORT}`) //eslint-disable-line
);

if ( isDev ) {
  if ( module.hot ) {
    module.hot.accept(
      './server', () => {
        server.removeListener(
          'request', currentApp
        );

        server.on(
          'request', app
        );

        currentApp = app;
      }
    );
  }
}
// else server.on('request', app)
