import React, { useState, useEffect} from 'react';
import { Card, Col, Container, Form, Row ,Button} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../../utils/api';
import { getErrorMessage, getStateOptions,getDeptOptions,getAptType,getFoodpref} from '../../../utils/helpers';
import { prefs } from './prefs';
import { toast } from 'react-toastify';
import { setEmail, setPassword } from '../../../redux/action-creators/index';
import { MDBRange } from 'mdb-react-ui-kit';
import {app} from '../../../base';
const RADIO_OPTIONS = ['Yes', 'No'];
const GENDER_OPTIONS = ['Female','Male']
const CULINARY_SKILLS = ['Expert','Sometimes','None']
const db = app.firestore();
const Preferences = () => {
  const dispatch = useDispatch();
  const { email, displayName, password } = useSelector((state) => state?.auth);
  const navigate = useNavigate();
  
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
  const [img,setImg] = useState(null);

  const [didSaveBtnClick, setDidSaveBtnClick] = useState(false);
  const fileSelectedHandler = async (e) =>{
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setImg(await fileRef.getDownloadURL());
  }
  const fileUploadHandler = () =>{
    const userName = displayName;
    if(!userName)
    return;

    db.collection("images").doc(userName).set({
      email : email,
      Avatar: img
    })
      
  }
  const isValidNumberInput = (number) =>
    number !== undefined && number !== null && !Number.isNaN(number) && number !== 0;
  const onFinishSignup = () => {
    fileUploadHandler();
    setDidSaveBtnClick(true);

    registerUser({
        email,
        name: displayName,
        password,
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
        .then(() => {
          dispatch(setEmail(''));
          dispatch(setPassword(''));
          toast.success('User created successfully.');
          navigate('/login');
        })
        .catch((error) => {
          toast.error(getErrorMessage(error));
        });
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
              <Form.Label>{prefs?.[0]?.question}</Form.Label>
                <div className='profile-radio-buttons'>
                  {GENDER_OPTIONS?.map((option) => (
                    <Form.Check
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
                    className='text-input'
                    value={hometown}
                    onChange={(e) => setHomeTown(e?.target?.value)}
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
                  <Form.Select
                    className='text-input'
                    value={currentcity}
                    onChange={(e) => setCurrentcity(e?.target?.value)}
                    onKeyDown={handleEnterPress}
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
                  {RADIO_OPTIONS?.map((option) => (
                    <Form.Check
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
                  {RADIO_OPTIONS?.map((option) => (
                    <Form.Check
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
                  className='text-input'
                  type='number'
                  placeholder='Work Experience'
                  min = '0'
                  value={workex}
                  onChange={(e) => setWorkex(parseInt(e?.target?.value))}
                  onKeyDown={handleEnterPress}
                />
                {didSaveBtnClick && !isValidNumberInput(workex) && (
                  <div className='auth-error'>Work Experience is empty</div>
                )}
              </Col>
              
            </Row>

            <Row>
            <Col sm='6'>
                <Form.Label>{prefs?.[6]?.question}</Form.Label>
                <Form.Control
                  className='text-input'
                  type='number'
                  placeholder='Distance from university'
                  min = '0'
                  value={distuni}
                  onChange={(e) => setDistuni(parseInt(e?.target?.value))}
                  onKeyDown={handleEnterPress}
                />
                {didSaveBtnClick && !isValidNumberInput(distuni) && (
                  <div className='auth-error'>Distance from university is empty</div>
                )}
              </Col>
              <Col sm='6'>
                <Form.Label>{prefs?.[7]?.question}</Form.Label>
                <Form.Select
                  className='text-input'
                  value={apttype}
                  onChange={(e) => setApttype(e?.target?.value)}
                  onKeyDown={handleEnterPress}
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
                    defaultValue={5000}
                    min='5000'
                    max='40000'
                    step='1000'
                    onChange = {(e) => setRentbudget(e?.target?.value)}/>   
              </Col>
              <Col sm='6'>
              <Form.Label>{prefs?.[9]?.question}</Form.Label>
              <div className='profile-radio-buttons'>
                  {RADIO_OPTIONS?.map((option) => (
                    <Form.Check
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
                  className='text-input'
                  value={foodpref}
                  onChange={(e) => setFoodpref(e?.target?.value)}
                  onKeyDown={handleEnterPress}
                >
                {getFoodpref()?.map((option) => (
                <option value={option}>{option}</option>
                ))}
                </Form.Select>
              </Col>
            <Col sm='6'>
              <Form.Label>{prefs?.[11]?.question}</Form.Label>
              <div className='profile-radio-buttons'>
                  {RADIO_OPTIONS?.map((option) => (
                    <Form.Check
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
                    className='text-input'
                    value={culskills}
                    onChange={(e) => setCulskills(e?.target?.value)}
                    onKeyDown={handleEnterPress}
                  >
                  {CULINARY_SKILLS.map((option) => (
                  <option value={option}>{option}</option>
                  ))}
                  </Form.Select>
              </Col>  
              <Col sm='6'>
              <Form.Label>{prefs?.[13]?.question}</Form.Label>
              <Form.Select
                    className='text-input'
                    value={dept}
                    onChange={(e) => setDept(e?.target?.value)}
                    onKeyDown={handleEnterPress}
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
                  {RADIO_OPTIONS?.map((option) => (
                    <Form.Check
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
                    defaultValue={1}
                    min='1'
                    max='3'
                    step='1'
                    onChange = {(e) => setMaxppr(e?.target?.value)}/> 
              </Col>
            </Row>
            <Row>
              <Form.Label>Upload Profile Picture</Form.Label>
                <input type="file" onChange={fileSelectedHandler}/>
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
