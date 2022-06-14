import { validate } from 'email-validator';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setEmail, setPassword } from '../../../redux/action-creators';
import { userLogin } from '../../../utils/api';
import '../styles.css';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../../../utils/helpers';
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

const Login = () => {
  const { email, password } = useSelector((state) => state?.auth);
  const [didLoginBtnClick, setDidLoginBtnClick] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const navigateToSignup = () => {
    navigate('/register');
  };
  const onLogin = () => {
    setDidLoginBtnClick(true);
    if (validate(email) && password) {
      setIsLoggingIn(true);
      userLogin({ email, password })
        .then(({ data }) => {
          const {
            token,
            user: { userId, name, email },
          } = data;
          localStorage.setItem(
            'app-user',
            JSON.stringify({ userId, name, token, email })
          );
          setIsLoggingIn(false);
          toast.success('Login successful.');
          navigate('/dashboard');
        })
        .catch((error) => {
          setIsLoggingIn(false);
          toast.error(getErrorMessage(error));
        });
    }
  };
  const handleEnterPress = (e) => {
    if (e?.key === 'Enter') {
      onLogin();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

 

  return (
    <>
    <div className = 'auth-page'>
      <div className = 'container'>
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
            <b>Sign in</b>
          </Typography>
          <Box className='non-opaque-comp' component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
              onChange={(e) => dispatch(setEmail(e?.target?.value))}
              onKeyDown = {handleEnterPress}
              InputLabelProps={{style: {fontWeight:'bold'}}}
            />
            {didLoginBtnClick && !validate(email) && (
              <div className='auth-error'>Please enter valid email address</div>
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
              onChange={(e) => dispatch(setPassword(e?.target?.value))}
              onKeyDown = {handleEnterPress}
              InputLabelProps={{style: {fontWeight:'bold'}}}
            />
            {didLoginBtnClick && !password && (
              <div className='auth-error'> enter password</div>
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
              onClick={onLogin}
              disabled={isLoggingIn}
            >
              Sign In
            </Button>
            <Grid container>
              
              <Grid item >
                <Link href="#" variant="body2" onClick={navigateToSignup}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    </div>
    </div>
    </>
  );
};

export default Login;
