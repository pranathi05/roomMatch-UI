import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyOTP } from '../../../utils/api';
import '../styles.css';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../../../utils/helpers';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © CSE-MIT-2022 '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const OTP = () => {
  const [otp, setOtp] = useState('');
  const [didVerifyBtnClick, setDidVerifyBtnClick] = useState(false);
  const [isVerifyingOTP, setIsVerifyingOTP] = useState(false);

  const navigate = useNavigate();
  const onVerify = () => {
    setDidVerifyBtnClick(true);
    if (otp?.length === 4) {
      setIsVerifyingOTP(true);
      verifyOTP(otp)
        .then(({ data }) => {
          setDidVerifyBtnClick(false);
          setIsVerifyingOTP(false);
          toast.success(data?.message);
          navigate('/preferences');
        })
        .catch((error) => {
          setIsVerifyingOTP(false);
          toast.error(getErrorMessage(error));
        });
    }
  };
  const handleEnterPress = (e) => {
    if (e?.key === 'Enter') {
      onVerify();
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
    // <div className='auth-layout'>
    //   <Card className='auth-card'>
    //     <Card.Header className='auth-card-header'>OTP Verification</Card.Header>
    //     <Card.Body className='auth-card-body'>
    //       <Form.Group className='mb-3' controlId='formBasicEmail'>
    //         <Form.Label>One-time-password</Form.Label>
    //         <Form.Control
    //           className='text-input'
    //           type='text'
    //           value={otp}
    //           onChange={(e) => setOtp(e?.target?.value)}
    //           placeholder='Enter OTP'
    //           onKeyDown={handleEnterPress}
    //         />
    //         {didVerifyBtnClick && otp?.length < 4 && (
    //           <div className='auth-error'>Please enter 4-digit OTP</div>
    //         )}
    //       </Form.Group>

    //       <button
    //         disabled={isVerifyingOTP}
    //         className='custom-button'
    //         onClick={onVerify}
    //       >
    //         Verify
    //       </button>
    //     </Card.Body>
    //   </Card>
    // </div>

    <>
      <div >
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
            <Typography component="h1" variant="h5">
            One-time-password
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="otp"
                label="Enter OTP"
                name="otp"
                autoComplete="otp"
                autoFocus
                value={otp}
                onChange={(e) => setOtp(e?.target?.value)}
                onKeyDown = {handleEnterPress}
              />
              {didVerifyBtnClick && otp?.length < 4 && (
                <div className='auth-error'>Please enter 4-digit OTP</div>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={onVerify}
                disabled={isVerifyingOTP}
              >
                Verify
              </Button>
              
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
      </div>
      
    </>
  );
};

export default OTP;
