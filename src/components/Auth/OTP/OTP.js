import React, { useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { verifyOTP } from '../../../utils/api';
import '../styles.css';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../../../utils/helpers';
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
  return (
    <div className='auth-layout'>
      <Card className='auth-card'>
        <Card.Header className='auth-card-header'>OTP Verification</Card.Header>
        <Card.Body className='auth-card-body'>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>One-time-password</Form.Label>
            <Form.Control
              className='text-input'
              type='text'
              value={otp}
              onChange={(e) => setOtp(e?.target?.value)}
              placeholder='Enter OTP'
              onKeyDown={handleEnterPress}
            />
            {didVerifyBtnClick && otp?.length < 4 && (
              <div className='auth-error'>Please enter 4-digit OTP</div>
            )}
          </Form.Group>

          <button
            disabled={isVerifyingOTP}
            className='custom-button'
            onClick={onVerify}
          >
            Verify
          </button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default OTP;
