// @flow
export const helloEndpointRoute = ( num: ?number ) => `/api/message/${num || ':num'}`;
