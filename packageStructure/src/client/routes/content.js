import { Bye, Home, TodoPage, Welcome } from 'Containers/Loadables';

const content = [
  {
    component: Home,
    exact: true,
    path: '/',
  },
  {
    component: Welcome,
    exact: true,
    path: '/welcome',
  },
];

export default content;
