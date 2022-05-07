import { request } from 'axios';
import { API_URL } from '../../constants';
const getJWT = () => {
  const token = JSON.parse(localStorage.getItem('app-user'))?.token;
  return token || null;
};
const getHeaders = (jwtToken) => ({
  Authorization: 'Bearer ' + jwtToken,
});
export const sendOTP = (email) =>
  request({
    method: 'POST',
    url: `${API_URL}/auth/otp/send`,
    data: {
      email,
    },
  });
export const verifyOTP = (otp) =>
  request({
    method: 'POST',
    url: `${API_URL}/auth/otp/verify`,
    data: {
      otp,
    },
  });
export const registerUser = ({ email, name, password, preferences }) =>
  request({
    method: 'POST',
    url: `${API_URL}/auth/register`,
    data: { email, name, password, preferences },
  });
export const userLogin = ({ email, password }) =>
  request({
    method: 'POST',
    url: `${API_URL}/auth/login`,
    data: { email, password },
  });
export const isAuthorized = () =>
  request({
    method: 'GET',
    url: `${API_URL}/auth/authorized`,
    headers: getHeaders(getJWT()),
  });
export const getUserInfo = () =>
  request({
    method: 'GET',
    url: `${API_URL}/user`,
    headers: getHeaders(getJWT()),
  });
export const updateUserInfo = ({ name, preferences }) =>
  request({
    method: 'PATCH',
    url: `${API_URL}/user`,
    headers: getHeaders(getJWT()),
    data: { name, preferences },
  });
export const getUsers = ({ from, to }) =>
  request({
    method: 'GET',
    url: `${API_URL}/user/all?from=${from}&to=${to}`,
    headers: getHeaders(getJWT()),
  });
