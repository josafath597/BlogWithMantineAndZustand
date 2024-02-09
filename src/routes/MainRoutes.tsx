import { Navigate } from 'react-router-dom';
import Home from '../components/Home';

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '*',
      element: <Navigate to="/" />,
    },
  ],
};

export default MainRoutes;
