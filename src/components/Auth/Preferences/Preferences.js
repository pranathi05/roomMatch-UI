import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../../utils/api';
import RadioInput from './Inputs/RadioInput';
import RangeInput from './Inputs/RangeInput';
import SelectInput from './Inputs/SelectInput';
import TextInput from './Inputs/TextInput';
import { prefs } from './prefs';
const Preferences = () => {
  const { email, displayName, password } = useSelector((state) => state?.auth);
  const navigate = useNavigate();
  const [currentPref, setCurrentPref] = useState(0);

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

  const [didNextBtnClick, setDidNextBtnClick] = useState(false);

  const getQuestion = () => prefs?.[currentPref]?.question;
  const getType = () => prefs?.[currentPref]?.type;
  const getName = () => prefs?.[currentPref]?.name;
  const getOptions = () => prefs?.[currentPref]?.options;

  const goNext = () => {
    setDidNextBtnClick(true);
    if (
      [3, 4, 7, 8, 9]?.includes(currentPref) ||
      (currentPref === 0 && age) ||
      (currentPref === 1 && residence) ||
      (currentPref === 2 && rent?.from && rent?.to) ||
      (currentPref === 5 && joining >= 0) ||
      (currentPref === 6 && idealLocation)
    ) {
      setCurrentPref((prevPref) => prevPref + 1);
      setDidNextBtnClick(false);
    }
  };

  const onFinishSignup = () => {
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
        navigate('/login');
      })
      .catch(() => {
        alert('Some error occured.');
      });
  };
  const handleEnterPress = (e) => {
    if (e?.key === 'Enter') {
      goNext();
    }
  };
  return (
    <div className='auth-layout'>
      <Card className='auth-card'>
        <Card.Header className='auth-card-header'>{getQuestion()}</Card.Header>
        <Card.Body className='auth-card-body'>
          {getType() === 'text' || getType() === 'number' ? (
            <TextInput
              handleEnterPress={handleEnterPress}
              type={getType()}
              value={
                getName() === 'age'
                  ? age
                  : getName() === 'residence'
                  ? residence
                  : getName() === 'joining'
                  ? joining
                  : getName() === 'idealLocation'
                  ? idealLocation
                  : ''
              }
              setValue={
                getName() === 'age'
                  ? setAge
                  : getName() === 'residence'
                  ? setResidence
                  : getName() === 'joining'
                  ? setJoining
                  : getName() === 'idealLocation'
                  ? setIdealLocation
                  : ''
              }
              didNextBtnClick={didNextBtnClick}
            />
          ) : getType() === 'radio' ? (
            <RadioInput
              name={getName()}
              options={getOptions()}
              value={
                getName() === 'guestsAllowed'
                  ? guestsAllowed
                  : getName() === 'smokingAllowed'
                  ? smokingAllowed
                  : getName() === 'isStudent'
                  ? isStudent
                  : getName() === 'mealStatus'
                  ? mealStatus
                  : ''
              }
              setValue={
                getName() === 'guestsAllowed'
                  ? setGuestsAllowed
                  : getName() === 'smokingAllowed'
                  ? setSmokingAllowed
                  : getName() === 'isStudent'
                  ? setIsStudent
                  : getName() === 'mealStatus'
                  ? setMealStatus
                  : ''
              }
            />
          ) : getType() === 'range' ? (
            <RangeInput
              handleEnterPress={handleEnterPress}
              value={getName() === 'rent' ? rent : ''}
              setValue={getName() === 'rent' ? setRent : ''}
              didNextBtnClick={didNextBtnClick}
            />
          ) : getType() === 'select' ? (
            <SelectInput
              value={getName() === 'sleepTime' ? sleepTime : ''}
              setValue={getName() === 'sleepTime' ? setSleepTime : ''}
              name={getName()}
              options={getOptions()}
            />
          ) : (
            ''
          )}
          <div className='prefernces-buttons'>
            <div className='prefs-count'>
              {currentPref + 1} out of {prefs?.length}
            </div>
            {currentPref < prefs?.length - 1 ? (
              <button className='custom-button' onClick={goNext}>
                Next &#x2192;
              </button>
            ) : (
              <button className='custom-button' onClick={onFinishSignup}>
                Submit
              </button>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Preferences;
