import { validate } from 'email-validator';
import React, { useState, useEffect } from 'react';
import { Card, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  setDisplayName,
  setEmail,
  setPassword,
} from '../../../redux/action-creators';
import { sendOTP } from '../../../utils/api/index';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../../../utils/helpers';
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
  const handleEnterPress = (e) => {
    if (e?.key === 'Enter') {
      registerUser();
    }
  };
  const registerUser = () => {
    setDidSignupBtnClick(true);
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
    <div className='auth-layout'>
      <Card className='auth-card'>
        <Card.Header className='auth-card-header'>Register</Card.Header>
        <Card.Body className='auth-card-body'>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              value={email}
              onChange={(e) => dispatch(setEmail(e?.target?.value))}
              autoComplete='off'
              name='--your-email--'
              className='text-input'
              type='email'
              placeholder='Enter email'
              onKeyDown={handleEnterPress}
            />
            {didSignupBtnClick && !validate(email) && (
              <div className='auth-error'>Please enter valid email address</div>
            )}
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Display Name</Form.Label>
            <Form.Control
              value={displayName}
              onChange={(e) => dispatch(setDisplayName(e?.target?.value))}
              autoComplete='off'
              name='--your-name--'
              className='text-input'
              type='text'
              placeholder='Enter name'
              onKeyDown={handleEnterPress}
            />
            {didSignupBtnClick && !displayName && (
              <div className='auth-error'>Please enter display name</div>
            )}
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={password}
              onChange={(e) => dispatch(setPassword(e?.target?.value))}
              className='text-input'
              type='password'
              name='--your-password--'
              autoComplete='off'
              placeholder='Password'
              onKeyDown={handleEnterPress}
            />
            {didSignupBtnClick && password?.length < 6 && (
              <div className='auth-error'>
                Password should be at least 6 characters long
              </div>
            )}
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicConfirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e?.target?.value)}
              className='text-input'
              type='password'
              placeholder='Confirm Password'
              onKeyDown={handleEnterPress}
            />
            {didSignupBtnClick && password !== confirmPassword && (
              <div className='auth-error'>Passwords do not match</div>
            )}
          </Form.Group>
          <span onClick={navigateToLogin} className='auth-screen-link'>
            Login Instead
          </span>
          <button
            disabled={isSendingOTP}
            className='custom-button'
            onClick={registerUser}
          >
            Register
          </button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Signup;
