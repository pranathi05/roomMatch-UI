import React, { useCallback, useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { getUserInfo } from '../../utils/api';
import { getAptType, getDeptOptions, getErrorMessage,getFoodpref,getStateOptions } from '../../utils/helpers';
import { prefs } from '../Auth/Preferences/prefs';
import './styles.css';
import { updateUserInfo } from '../../utils/api/index';
import { useDispatch } from 'react-redux';
import { setAppUser } from '../../redux/action-creators';
import { toast } from 'react-toastify';
import DataLoader from '../Common/DataLoader';
import { MDBRange } from 'mdb-react-ui-kit';
const CULINARY_SKILLS = ['Expert','Sometimes','None']

const Profile = () => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [didUpdateBtnClick, setDidUpdateBtnClick] = useState(false);
  const [isFetchingProfile, setIsFetchingProfile] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender,setGender] = useState('Female')
  const [hometown,setHomeTown] = useState('Andhra Pradesh')
  const [currentcity,setCurrentcity] = useState('Andhra Pradesh')
  const [needroommate,setNeedRoommate] = useState(true);
  const [otherbranch,setOtherbranch] = useState(false);
  const [workex,setWorkex] = useState(0);
  const [distuni,setDistuni] = useState(0);
  const [apttype,setApttype] = useState('1bhk');
  const [rentbudget,setRentbudget] = useState(5000);
  const [alcohol,setAlcohol] = useState(false);
  const [foodpref,setFoodpref] = useState('Flexible');
  const [smoking,setSmoking] = useState(false);
  const [culskills,setCulskills] = useState('Sometimes');
  const lookingforroommate = true;
  const [dept,setDept] = useState('Aeronautical engineering');
  const [hall,setHall] = useState(false);
  const [maxppr,setMaxppr] = useState(1);

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
        setGender(data?.preferences?.gender);
        setHomeTown(data?.preferences?.hometown);
        setCurrentcity(data?.preferences?.currentcity);
        setNeedRoommate(data?.preferences?.needroommate);
        setWorkex(data?.preferences?.workex);
        setDistuni(data?.preferences?.distuni);
        setApttype(data?.preferences?.apttype);
        setOtherbranch(data?.preferences?.otherbranch);
        setRentbudget(data?.preferences?.rentbudget);
        setAlcohol(data?.preferences?.alcohol);
        setSmoking(data?.preferences?.smoking);
        setFoodpref(data?.preferences?.foodpref);
        setCulskills(data?.preferences?.culskills);
        setDept(data?.preferences?.dept);
        setHall(data?.preferences?.hall);
        setMaxppr(data?.preferences?.maxppr);
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
      isValidNumberInput(workex) &&
      gender && 
      isValidNumberInput(distuni) 
    ) {
      updateUserInfo({
        name,
        preferences: {
          gender , 
          hometown ,
          currentcity ,
          needroommate ,
          otherbranch ,
          workex ,
          distuni ,
          apttype ,
          rentbudget ,
          alcohol ,
          foodpref ,
          smoking ,
          culskills ,
          lookingforroommate ,
          dept ,
          hall ,
          maxppr
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
              <Form.Label>{prefs?.[0]?.question}</Form.Label>
              <div className='profile-radio-buttons'>
                {getOptions('gender')?.map((option) => (
                  <Form.Check
                    disabled={!isEditing}
                    type='radio'
                    label={option}
                    name='gender'
                    checked={
                      (gender === "Female" && option === 'Female') ||
                        (gender === "Male" && option === 'Male') 
                    }
                    className='text-input'
                    onClick={() => setGender(option)}
                  />
                ))}
              </div>
            </Col>
              <Col sm='6'>
              <Form.Group>
                  <Form.Label>{prefs?.[1]?.question}</Form.Label>
                <Form.Select
                    disabled={!isEditing}
                  className='text-input'
                    value={hometown}
                    onChange={(e) => setHomeTown(e?.target?.value)}
                    onKeyDown={onEnterPress}
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
                  <Form.Select
                      disabled={!isEditing}
                      className='text-input'
                    value={currentcity}
                    onChange={(e) => setCurrentcity(e?.target?.value)}
                    onKeyDown={onEnterPress}
                  >
                  {getStateOptions()?.map((option) => (
                  <option value={option}>{option}</option>
                  ))}
                  </Form.Select>
                  </Form.Group>
              </Col>
              <Col sm='6'>
                <Form.Label>{prefs?.[3]?.question}</Form.Label>
                <div className='profile-radio-buttons'>
                  {getOptions('needroommate')?.map((option) => (
                    <Form.Check
                      disabled={!isEditing}
                      type='radio'
                      label={option}
                      name='needroommate'
                      checked={
                        (needroommate && option === 'Yes') ||
                        (!needroommate && option === 'No')
                        }
                      className='text-input'
                      onClick={() => setNeedRoommate(option === 'Yes')}
                    />
                  ))}
                </div>
                  </Col>
            </Row>
            <Row>
              <Col sm='6'>
                <Form.Label>{prefs?.[4]?.question}</Form.Label>
                <div className='profile-radio-buttons'>
                  {getOptions('otherbranch')?.map((option) => (
                    <Form.Check
                      disabled={!isEditing}
                      type='radio'
                      label={option}
                      name='otherbranch'
                      checked={
                        (otherbranch && option === 'Yes') ||
                        (!otherbranch && option === 'No')
                      }
                      className='text-input'
                      onClick={() => setOtherbranch(option === 'Yes')}
                    />
                  ))}
                </div>
                  </Col>
              <Col sm='6'>
                <Form.Label>{prefs?.[5]?.question}</Form.Label>
                    <Form.Control
                      disabled={!isEditing}
                      className='text-input'
                      type='number'
                  placeholder='Work Experience'
                  min = '0'
                  value={workex}
                  onChange={(e) => setWorkex(parseInt(e?.target?.value))}
                  onKeyDown={onEnterPress}
                    />
                {didUpdateBtnClick && !isValidNumberInput(workex) && (
                  <div className='auth-error'>Work Experience is empty</div>
                )}
                  </Col>
                </Row>
            <Row>
            <Col sm='6'>
                <Form.Label>{prefs?.[6]?.question}</Form.Label>
              <Form.Control
                disabled={!isEditing}
                className='text-input'
                type='number'
                  placeholder='Distance from university'
                  min = '0'
                  value={distuni}
                  onChange={(e) => setDistuni(parseInt(e?.target?.value))}
                  onKeyDown={onEnterPress}
              />
                {didUpdateBtnClick && !isValidNumberInput(distuni) && (
                  <div className='auth-error'>Distance from university is empty</div>
              )}
            </Col>
              <Col sm='6'>
                <Form.Label>{prefs?.[7]?.question}</Form.Label>
                <Form.Select
                  disabled={!isEditing}
                  className='text-input'
                  value={apttype}
                  onChange={(e) => setApttype(e?.target?.value)}
                  onKeyDown={onEnterPress}
                >
                {getAptType()?.map((option) => (
                <option value={option}>{option}</option>
                ))}
                </Form.Select>
              </Col>
              
          </Row>
          <Row>
            <Col sm='6'>
                  <Form.Label>{prefs?.[8]?.question}</Form.Label>
                  <MDBRange
                    disabled={!isEditing}
                    defaultValue={5000}
                    min='5000'
                    max='40000'
                    step='1000'
                    onChange = {(e) => setRentbudget(e?.target?.value)}/>   
            </Col>
            <Col sm='6'>
              <Form.Label>{prefs?.[9]?.question}</Form.Label>
              <div className='profile-radio-buttons'>
                  {getOptions('alcohol')?.map((option) => (
                  <Form.Check
                    disabled={!isEditing}
                    type='radio'
                    label={option}
                      name='alcohol'
                    checked={
                        (alcohol && option === 'Yes') ||
                        (!alcohol && option === 'No')
                    }
                    className='text-input'
                      onClick={() => setAlcohol(option === 'Yes')}
                  />
                ))}
              </div>
            </Col>
              
          </Row>
          <Row>
            <Col sm='6'>
                <Form.Label>{prefs?.[10]?.question}</Form.Label>
                <Form.Select
                    disabled={!isEditing}
                    className='text-input'
                  value={foodpref}
                  onChange={(e) => setFoodpref(e?.target?.value)}
                  onKeyDown={onEnterPress}
                >
                {getFoodpref()?.map((option) => (
                <option value={option}>{option}</option>
                ))}
                </Form.Select>
            </Col>
            <Col sm='6'>
              <Form.Label>{prefs?.[11]?.question}</Form.Label>
              <div className='profile-radio-buttons'>
                  {getOptions('smoking')?.map((option) => (
                  <Form.Check
                    disabled={!isEditing}
                    type='radio'
                    label={option}
                      name='smoking'
                    checked={
                        (smoking && option === 'Yes') ||
                        (!smoking && option === 'No')
                    }
                    className='text-input'
                      onClick={() => setSmoking(option === 'Yes')}
                  />
                ))}
              </div>
            </Col>
              
          </Row>
          <Row>
            <Col sm='6'>
              <Form.Label>{prefs?.[12]?.question}</Form.Label>
              <Form.Select
                    disabled={!isEditing}
                  className='text-input'
                    value={culskills}
                    onChange={(e) => setCulskills(e?.target?.value)}
                    onKeyDown={onEnterPress}
                >
                  {CULINARY_SKILLS.map((option) => (
                <option value={option}>{option}</option>
                ))}
                </Form.Select>
            </Col>
            <Col sm='6'>
              <Form.Label>{prefs?.[13]?.question}</Form.Label>
              <Form.Select
                    disabled={!isEditing}
                className='text-input'
                    value={dept}
                    onChange={(e) => setDept(e?.target?.value)}
                    onKeyDown={onEnterPress}
              >
                  {getDeptOptions()?.map((option) => (
                  <option value={option}>{option}</option>
                ))}
              </Form.Select>
            </Col>
          </Row>
            <Row>
            <Col sm='6'>
              <Form.Label>{prefs?.[14]?.question}</Form.Label>
              <div className='profile-radio-buttons'>
                  {getOptions('hall')?.map((option) => (
                    <Form.Check
                    disabled={!isEditing}
                      type='radio'
                      label={option}
                      name='hall'
                      checked={
                        (hall && option === 'Yes') ||
                        (!hall && option === 'No')
                      }
                      className='text-input'
                      onClick={() => setHall(option === 'Yes')}
                    />
                  ))}
                </div>
              </Col>
              <Col sm="4">
              <Form.Label>{prefs?.[15]?.question}</Form.Label>
                  <MDBRange
                    disabled={!isEditing}
                    defaultValue={1}
                    min='1'
                    max='3'
                    step='1'
                    onChange = {(e) => setMaxppr(e?.target?.value)}/> 
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
