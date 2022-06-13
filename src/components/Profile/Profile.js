import React, { useCallback, useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { getUserInfo } from '../../utils/api';
import { getErrorMessage,getStateOptions, getTimeOptions } from '../../utils/helpers';
import { prefs } from '../Auth/Preferences/prefs';
import './styles.css';
import { updateUserInfo } from '../../utils/api/index';
import { useDispatch } from 'react-redux';
import { setAppUser } from '../../redux/action-creators';
import { toast } from 'react-toastify';
import DataLoader from '../Common/DataLoader';
const Profile = () => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [didUpdateBtnClick, setDidUpdateBtnClick] = useState(false);
  const [isFetchingProfile, setIsFetchingProfile] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(1);
  const [residence, setResidence] = useState('');
  const [rent, setRent] = useState({ from: 1, to: 1000 });
  const [guestsAllowed, setGuestsAllowed] = useState(true);
  const [smokingAllowed, setSmokingAllowed] = useState(true);
  const [joining, setJoining] = useState(0);
  const [idealLocation, setIdealLocation] = useState('');
  const [isStudent, setIsStudent] = useState(true);
  const [sleepTime, setSleepTime] = useState('06:00 PM');
  const [mealStatus, setMealStatus] = useState(true);

  const onEnterPress = (e) => {
    if (e?.key === 'Enter') {
      onUpdate();
    }
  };
  const getOptions = (name) =>
    prefs?.find((pref) => pref?.name === name)?.options;

  const getUser = useCallback(() => {
    setIsFetchingProfile(true);
    getUserInfo()
      .then(({ data }) => {
        dispatch(setAppUser(data?.name));
        setName(data?.name);
        setEmail(data?.email);
        setAge(data?.preferences?.age);
        setRent(data?.preferences?.rent);
        setResidence(data?.preferences?.residence);
        setGuestsAllowed(data?.preferences?.guestsAllowed);
        setSmokingAllowed(data?.preferences?.smokingAllowed);
        setJoining(data?.preferences?.joining);
        setIdealLocation(data?.preferences?.idealLocation);
        setIsStudent(data?.preferences?.isStudent);
        setSleepTime(data?.preferences?.sleepTime);
        setMealStatus(data?.preferences?.mealStatus);
        setIsFetchingProfile(false);
      })
      .catch((error) => {
        setIsFetchingProfile(false);
        toast.error(getErrorMessage(error));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    getUser();
  }, [getUser]);
  const isValidNumberInput = (number) =>
    number !== undefined && number !== null && !Number.isNaN(number);
  const onUpdate = () => {
    setDidUpdateBtnClick(true);
    if (
      name &&
      isValidNumberInput(age) &&
      residence &&
      isValidNumberInput(rent?.from) &&
      isValidNumberInput(rent?.to) &&
      rent?.from <= rent?.to &&
      isValidNumberInput(joining) &&
      idealLocation
    ) {
      updateUserInfo({
        name,
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
        .then(({ data }) => {
          toast.success(data?.message);
          getUser();
          setIsEditing(false);
        })
        .catch((error) => {
          toast.error(getErrorMessage(error));
          setIsEditing(false);
        });
    }
  };
  return (
    <div className='content'>
      <div className='content-header'>
        <div className='content-heading'>Profile Settings</div>
        {!isEditing && (
          <div>
            <span onClick={() => setIsEditing(true)}>Edit</span>
          </div>
        )}
      </div>
      {isFetchingProfile ? (
        <div className='screen-centered-div'>
          <DataLoader condition={isFetchingProfile} />
        </div>
      ) : (
        <Container>
          <Row className = 'content-non-opaque'>
            <Col sm='6'>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label >Email</Form.Label>
                <Form.Control
                  disabled
                  className='text-input'
                  type='email'
                  placeholder='Enter email'
                  value={email}
                />
              </Form.Group>
            </Col>
            <Col sm='6'>
              <Form.Group>
                <Form.Label>Display Name</Form.Label>
                <Form.Control
                  disabled={!isEditing}
                  className='text-input'
                  type='text'
                  placeholder='Enter name'
                  value={name}
                  onChange={(e) => setName(e?.target?.value)}
                  onKeyDown={onEnterPress}
                />
                {didUpdateBtnClick && !name && (
                  <div className='auth-error'>Name is empty</div>
                )}
              </Form.Group>
            </Col>
          </Row>
          <div className='content-sub-heading'>Preferences</div>
          <Row>
            <Col sm='6'>
              <Form.Group>
                <Form.Label>Age</Form.Label>
                <Form.Control
                  disabled={!isEditing}
                  className='text-input'
                  type='number'
                  placeholder='Enter age'
                  value={age}
                  onChange={(e) => setAge(parseInt(e?.target?.value))}
                  onKeyDown={onEnterPress}
                />
                {didUpdateBtnClick && !age && (
                  <div className='auth-error'>Age is empty</div>
                )}
              </Form.Group>
            </Col>
            <Col sm='6'>
              <Form.Group>
                <Form.Label>Residence</Form.Label>
                <Form.Select
                  className='text-input'
                  disabled={!isEditing}
                  value={residence}
                  onChange={(e) => setResidence(e?.target?.value)}
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
                <Form.Label>Rent</Form.Label>
                <Row style={{ marginBlock: '0' }}>
                  <Col sm='5'>
                    <Form.Control
                      disabled={!isEditing}
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
                      onKeyDown={onEnterPress}
                    />
                  </Col>
                  <Col sm='2' className='to-text'>
                    To
                  </Col>
                  <Col sm='5'>
                    <Form.Control
                      disabled={!isEditing}
                      className='text-input'
                      type='number'
                      min={0}
                      placeholder='To'
                      value={rent?.to}
                      onChange={(e) => {
                        setRent({ ...rent, to: parseInt(e?.target?.value) });
                      }}
                      onKeyDown={onEnterPress}
                    />
                  </Col>
                </Row>
                {didUpdateBtnClick &&
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
              <Form.Label >How early can you join (days)?</Form.Label>

              <Form.Control
                disabled={!isEditing}
                className='text-input'
                type='number'
                placeholder='Enter joining time'
                value={joining}
                onChange={(e) => setJoining(parseInt(e?.target?.value))}
                onKeyDown={onEnterPress}
              />
              {didUpdateBtnClick && !isValidNumberInput(joining) && (
                <div className='auth-error'>Joining time is empty</div>
              )}
            </Col>
          </Row>
          <Row>
            <Col sm='6'>
              <Form.Label  >Guests allowed?</Form.Label>

              <div className='profile-radio-buttons'>
                {getOptions('guestsAllowed')?.map((option) => (
                  <Form.Check
                    disabled={!isEditing}
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
              <Form.Label  >Drinking / smoking allowed?</Form.Label>

              <div className='profile-radio-buttons'>
                {getOptions('smokingAllowed')?.map((option) => (
                  <Form.Check
                    disabled={!isEditing}
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
              <Form.Label  >Are you a student?</Form.Label>
              <div className='profile-radio-buttons'>
                {getOptions('isStudent')?.map((option) => (
                  <Form.Check
                    disabled={!isEditing}
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
              <Form.Label  >Want to manage daily meal with roommate?</Form.Label>
              <div className='profile-radio-buttons'>
                {getOptions('mealStatus')?.map((option) => (
                  <Form.Check
                    disabled={!isEditing}
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
              <Form.Label  >Ideal location</Form.Label>
              <Form.Select
                  className='text-input'
                  disabled={!isEditing}
                  value={idealLocation}
                  onChange={(e) => setIdealLocation(e?.target?.value)}
                >
                {getStateOptions()?.map((option) => (
                <option value={option}>{option}</option>
                ))}
                </Form.Select>
            </Col>
            <Col sm='6'>
              <Form.Label  >Your sleep time?</Form.Label>
              <Form.Select
                className='text-input'
                disabled={!isEditing}
                value={sleepTime}
                onChange={(e) => setSleepTime(e?.target?.value)}
              >
                {getTimeOptions()?.map((option) => (
                  <option value={option}>{option}</option>
                ))}
              </Form.Select>
            </Col>
          </Row>
          {isEditing && (
            <Row>
              <div className='profile-buttons'>
                <span onClick={onUpdate}>Update</span>
                <span
                  onClick={() => {
                    getUser();
                    setIsEditing(false);
                  }}
                >
                  Cancel
                </span>
              </div>
            </Row>
          )}
        </Container>
      )}
    </div>
  );
};

export default Profile;
