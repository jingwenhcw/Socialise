import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ isAuth, children }) => {
  if (!isAuth) {
    return <Navigate to='/' />;
  }

  // authorized so return child components
  return children;
};
export default PrivateRoute;
