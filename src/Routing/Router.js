import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from '../components/Auth/Login/Login';
import OTP from '../components/Auth/OTP/OTP';
import Preferences from '../components/Auth/Preferences/Preferences';
import Signup from '../components/Auth/Signup/Signup';
import Home from '../components/Home/Home';
import PrivateRoute from './PrivateRoute';
import { isAuthorized } from '../utils/api/index';
import AuthRoute from './AuthRoute';

const Router = () => {
  const [loggedIn, setLoggedIn] = useState(null);
  useEffect(() => {
    isAuthorized().then(({ data }) => setLoggedIn(data));
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/dashboard' element={<PrivateRoute loggedIn={loggedIn} />}>
          <Route path='/dashboard' element={<Home />} />
        </Route>
        <Route path='/profile' element={<PrivateRoute loggedIn={loggedIn} />}>
          <Route path='/profile' element={<Home />} />
        </Route>
        <Route path='/' element={<PrivateRoute />}>
          <Route path='/' element={<Home />} />
        </Route>
        <Route path='/login' element={<AuthRoute />}>
          <Route path='/login' element={<Login />} />
        </Route>
        <Route path='/register' element={<AuthRoute />}>
          <Route path='/register' element={<Signup />} />
        </Route>
        <Route path='/otp/verification' element={<AuthRoute />}>
          <Route path='/otp/verification' element={<OTP />} />
        </Route>
        <Route path='/preferences' element={<AuthRoute />}>
          <Route path='/preferences' element={<Preferences />} />
        </Route>
        <Route path='*' element={<PrivateRoute />}>
          <Route path='*' element={<Home />} />
        </Route>
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
