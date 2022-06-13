import React, { useState } from 'react';
import { Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../../utils/api';
import { getErrorMessage, getStateOptions, getTimeOptions } from '../../../utils/helpers';
import { prefs } from './prefs';
import { toast } from 'react-toastify';
import { setEmail, setPassword } from '../../../redux/action-creators/index';
const RADIO_OPTIONS = ['Yes', 'No'];

const Preferences = () => {
  const dispatch = useDispatch();
  const { email, displayName, password } = useSelector((state) => state?.auth);
  const navigate = useNavigate();
  const [age, setAge] = useState(15);
  const [residence, setResidence] = useState('');
  const [rent, setRent] = useState({ from: 3000, to: 8000 });
  const [guestsAllowed, setGuestsAllowed] = useState(true);
  const [smokingAllowed, setSmokingAllowed] = useState(true);
  const [joining, setJoining] = useState(0);
  const [idealLocation, setIdealLocation] = useState('');
  const [isStudent, setIsStudent] = useState(true);
  const [sleepTime, setSleepTime] = useState('06:00 PM');
  const [mealStatus, setMealStatus] = useState(true);

  const [didSaveBtnClick, setDidSaveBtnClick] = useState(false);

  const isValidNumberInput = (number) =>
    number !== undefined && number !== null && !Number.isNaN(number);
    const onFinishSignup = () => {
    setDidSaveBtnClick(true);
    if (
      age &&
      residence &&
      rent?.from &&
      rent?.to &&
      rent?.from <= rent?.to &&
      joining >= 0 &&
      idealLocation
    ) {
      
      registerUser({
        email,
        name: displayName,
        password,
        preferences: {
          age,
          residence,
          rent,
          guestsAllowed,
          smokingAllowed,
          joining,
          idealLocation,
          isStudent,
          sleepTime,
          mealStatus,
        },
      })
        .then(() => {
          dispatch(setEmail(''));
          dispatch(setPassword(''));
          toast.success('User created successfully.');
          navigate('/login');
        })
        .catch((error) => {
          toast.error(getErrorMessage(error));
        });
    }
  };
  const handleEnterPress = (e) => {
    if (e?.key === 'Enter') {
      onFinishSignup();
    }
  };
  return (
    <div className='auth-layout'>
      <Card className='prefernces-card'>
        <Card.Header className='auth-card-header'>Preferences</Card.Header>
        <Card.Body className='auth-card-body'>
          <Container>
            <Row>
              <Col sm='6'>
                <Form.Group>
                  <Form.Label>{prefs?.[0]?.question}</Form.Label>
                  <Form.Control
                    className='text-input'
                    type='number'
                    placeholder='Enter age'
                    value={age}
                    onChange={(e) => setAge(parseInt(e?.target?.value))}
                    onKeyDown={handleEnterPress}
                  />
                  {didSaveBtnClick && !age && (
                    <div className='auth-error'>Age is empty</div>
                  )}
                </Form.Group>
              </Col>
              <Col sm='6'>
                <Form.Group>
                  <Form.Label>{prefs?.[1]?.question}</Form.Label>
                  <Form.Select
                    className='text-input'
                    value={residence}
                    onChange={(e) => setResidence(e?.target?.value)}
                    onKeyDown={handleEnterPress}
                  >
                  {getStateOptions()?.map((option) => (
                  <option value={option}>{option}</option>
                  ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm='6'>
                <Form.Group>
                  <Form.Label>{prefs?.[2]?.question}</Form.Label>
                  <Row style={{ marginBlock: '0' }}>
                    <Col sm='5'>
                      <Form.Control
                        className='text-input'
                        type='number'
                        placeholder='From'
                        min={0}
                        value={rent?.from}
                        onChange={(e) => {
                          if (parseInt(e?.target?.value) > rent?.to) {
                            setRent({
                              from: parseInt(e?.target?.value),
                              to: parseInt(e?.target?.value),
                            });
                          } else {
                            setRent({
                              ...rent,
                              from: parseInt(e?.target?.value),
                            });
                          }
                        }}
                        onKeyDown={handleEnterPress}
                      />
                    </Col>
                    <Col sm='2' className='to-text'>
                      To
                    </Col>
                    <Col sm='5'>
                      <Form.Control
                        className='text-input'
                        type='number'
                        min={0}
                        placeholder='To'
                        value={rent?.to}
                        onChange={(e) => {
                          setRent({ ...rent, to: parseInt(e?.target?.value) });
                        }}
                        onKeyDown={handleEnterPress}
                      />
                    </Col>
                  </Row>
                  {didSaveBtnClick &&
                    (!isValidNumberInput(rent?.from) ||
                      !isValidNumberInput(rent?.to) ||
                      rent?.from > rent?.to) && (
                      <div className='auth-error'>
                        Enter valid values for rent
                      </div>
                    )}
                </Form.Group>
              </Col>
              <Col sm='6'>
                <Form.Label>{prefs?.[3]?.question}</Form.Label>

                <Form.Control
                  className='text-input'
                  type='number'
                  placeholder='Enter joining time'
                  value={joining}
                  onChange={(e) => setJoining(parseInt(e?.target?.value))}
                  onKeyDown={handleEnterPress}
                />
                {didSaveBtnClick && !isValidNumberInput(joining) && (
                  <div className='auth-error'>Joining time is empty</div>
                )}
              </Col>
            </Row>
            <Row>
              <Col sm='6'>
                <Form.Label>{prefs?.[4]?.question}</Form.Label>

                <div className='profile-radio-buttons'>
                  {RADIO_OPTIONS?.map((option) => (
                    <Form.Check
                      type='radio'
                      label={option}
                      name='guestsAllowed'
                      checked={
                        (guestsAllowed && option === 'Yes') ||
                        (!guestsAllowed && option === 'No')
                      }
                      className='text-input'
                      onClick={() => setGuestsAllowed(option === 'Yes')}
                    />
                  ))}
                </div>
              </Col>
              <Col sm='6'>
                <Form.Label>{prefs?.[5]?.question}</Form.Label>

                <div className='profile-radio-buttons'>
                  {RADIO_OPTIONS?.map((option) => (
                    <Form.Check
                      type='radio'
                      label={option}
                      name='smokingAllowed'
                      checked={
                        (smokingAllowed && option === 'Yes') ||
                        (!smokingAllowed && option === 'No')
                      }
                      className='text-input'
                      onClick={() => setSmokingAllowed(option === 'Yes')}
                    />
                  ))}
                </div>
              </Col>
            </Row>

            <Row>
              <Col sm='6'>
                <Form.Label>{prefs?.[6]?.question}</Form.Label>
                <div className='profile-radio-buttons'>
                  {RADIO_OPTIONS?.map((option) => (
                    <Form.Check
                      type='radio'
                      label={option}
                      name='isStudent'
                      checked={
                        (isStudent && option === 'Yes') ||
                        (!isStudent && option === 'No')
                      }
                      className='text-input'
                      onClick={() => setIsStudent(option === 'Yes')}
                    />
                  ))}
                </div>
              </Col>
              <Col sm='6'>
                <Form.Label>
                  <Form.Label>{prefs?.[7]?.question}</Form.Label>
                </Form.Label>
                <div className='profile-radio-buttons'>
                  {RADIO_OPTIONS?.map((option) => (
                    <Form.Check
                      type='radio'
                      label={option}
                      name='mealStatus'
                      checked={
                        (mealStatus && option === 'Yes') ||
                        (!mealStatus && option === 'No')
                      }
                      className='text-input'
                      onClick={() => setMealStatus(option === 'Yes')}
                    />
                  ))}
                </div>
              </Col>
            </Row>
            <Row>
              <Col sm='6'>
                <Form.Label>{prefs?.[8]?.question}</Form.Label>
                <Form.Select
                  className='text-input'
                  value={idealLocation}
                  onChange={(e) => setIdealLocation(e?.target?.value)}
                  onKeyDown={handleEnterPress}
                >
                {getStateOptions()?.map((option) => (
                <option value={option}>{option}</option>
                ))}
                </Form.Select>
              </Col>
              <Col sm='6'>
                <Form.Label>{prefs?.[9]?.question}</Form.Label>
                <Form.Select
                  className='text-input'
                  value={sleepTime}
                  onChange={(e) => setSleepTime(e?.target?.value)}
                >
                  {getTimeOptions()?.map((option) => (
                    <option value={option}>{option}</option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
            <Row>
              <div className='profile-buttons'>
                <span onClick={onFinishSignup}>Save</span>
              </div>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Preferences;
