import { validate } from 'email-validator';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import {
  setDisplayName,
  setEmail,
  setPassword,
} from '../../../redux/action-creators';
import { sendOTP } from '../../../utils/api/index';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../../../utils/helpers';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props} className='non-opaque-comp'>
      {'Copyright © CSE-MIT-2022 '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const Signup = () => {
  const { email, displayName, password } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const [confirmPassword, setConfirmPassword] = useState('');
  const [didSignupBtnClick, setDidSignupBtnClick] = useState(false);
  const [isSendingOTP, setIsSendingOTP] = useState(false);

  useEffect(() => {
    dispatch(setEmail(''));
    dispatch(setDisplayName(''));
    dispatch(setPassword(''));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/login');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const handleEnterPress = (e) => {
    if (e?.key === 'Enter') {
      registerUser();
    }
  };
  const registerUser = () => {
    setDidSignupBtnClick(true);
    console.log(email);
    if (
      validate(email) &&
      password?.length >= 6 &&
      password === confirmPassword
    ) {
      setIsSendingOTP(true);
      sendOTP(email)
        .then(({ data }) => {
          setIsSendingOTP(false);
          toast.success(data?.message);
          navigate('/otp/verification');
        })
        .catch((error) => {
          setIsSendingOTP(false);
          toast.error(getErrorMessage(error));
        });
    }
  };

  return (
    <>
    <div className = 'auth-page'>
      <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <PeopleAltIcon />
          </Avatar>
          <Typography component="h1" variant="h5" className='non-opaque-comp'>
            RoomMatch - Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} className='non-opaque-comp'>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onKeyDown={handleEnterPress}
              onChange={(e) => dispatch(setEmail(e?.target?.value))}
              InputLabelProps={{style: {fontWeight:'bold'}}}
            />
            {didSignupBtnClick && !validate(email) && (
              <div className='auth-error'>Please enter valid email address</div>
            )}
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="displayName"
              label="Display Name"
              name="displayName"
              autoComplete="displayName"
              value={displayName}
              onKeyDown={handleEnterPress}
              onChange={(e) => dispatch(setDisplayName(e?.target?.value))}
              InputLabelProps={{style: {fontWeight:'bold'}}}
            />
            {didSignupBtnClick && !displayName && (
              <div className='auth-error'>Please enter display name</div>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onKeyDown={handleEnterPress}
              onChange={(e) => dispatch(setPassword(e?.target?.value))}
              InputLabelProps={{style: {fontWeight:'bold'}}}
            />
            {didSignupBtnClick && password?.length < 6 && (
              <div className='auth-error'>
                Password should be at least 6 characters long
              </div>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={confirmPassword}
              onKeyDown={handleEnterPress}
              onChange={(e) => dispatch(setConfirmPassword(e?.target?.value))}
              InputLabelProps={{style: {fontWeight:'bold'}}}
            />
            {didSignupBtnClick && password !== confirmPassword && (
              <div className='auth-error'>Passwords do not match</div>
            )}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={registerUser}
              disabled={isSendingOTP}
            >
              Register
            </Button>
            <Grid container>
              
              <Grid item >
                <Link href="#" variant="body2" onClick={navigateToLogin}>
                  {"Already have an account? Login."}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    </div>
    </>
  );
};

export default Signup;
