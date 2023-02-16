import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from 'react-router-dom';
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Profile from '~/pages/Profile';

import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from '~/theme';
import PrivateRoute from '~/routes/PrivateRoute';
//import reactLogo from './assets/react.svg'
//import './App.css';

function App() {
  const mode = useSelector((state) => state.auth.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.auth.token));

  return (
    <div className='app'>
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path='/' element={<Login />} />
            <Route
              path='/home'
              element={
                <PrivateRoute isAuth={isAuth}>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path='/profile/:userId'
              element={
                <PrivateRoute isAuth={isAuth}>
                  <Profile />
                </PrivateRoute>
              }
            />
          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
