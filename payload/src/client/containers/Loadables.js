import Loadable from 'react-loadable';
import Loading from 'Components/Loading';

export const Welcome = Loadable({
  loader: () => import(/*webpackChunkName: "Welcome" */ 'Scenes/Welcome'),
  loading: Loading,
});
export const Home = Loadable({
  loader: () => import(/*webpackChunkName: "Home" */ 'Scenes/Home'),
  loading: Loading,
});
