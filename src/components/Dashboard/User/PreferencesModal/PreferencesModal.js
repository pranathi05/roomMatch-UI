import React from 'react';
import { Container, Modal, Row, Col } from 'react-bootstrap';
import styled from "styled-components";
import { prefs } from '../../../Auth/Preferences/prefs';
import { useNavigate } from 'react-router-dom';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import Button2 from '@mui/material/Button';

const Button = styled.button`
    background-color:black;
    color: white;
    padding: 5px 15px;
    border-radius: 5px;
    outline: 0;
    cursor: pointer;
    box-shadow: 0px 2px 2px lightgray;
    &:hover {
      background-color: gray;
    }
`;
const PreferencesModal = ({ username,preferences, show, handleClose,email }) => {
  const navigate = useNavigate();
  const navigateToMessenger = () => {
    navigate(`/chat/${email}/${username}`);
  };
  return (
    <Modal
      className='preferences-modal'
      centered
      show={show}
      onHide={handleClose}
      keyboard={false}
      size='lg'
    >
      <Modal.Header closeButton>
        <Modal.Title>Preferences</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          {prefs?.map(({ label, name }) => (
            <Row>
              <Col sm='6' className='preferences-modal-label'>
                {label}
              </Col>
              <Col sm='6'>
                {preferences?.[name] === false ? "No" : 
                preferences?.[name] ===  true ? "Yes" : preferences?.[name]}
              </Col>
            </Row>
          ))}
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <div className='footer'>
          <div className="emailIcon">
          <Button2 color="inherit" size="large" startIcon={<ContactMailOutlinedIcon />} href={`mailto:${email}`}>
            <b>Contact</b>
          </Button2>
          </div>
          <div className = "chatIcon">
          <Button onClick={navigateToMessenger}>Chat</Button>
          </div>
        </div>
        </Modal.Footer>
    </Modal>
  );
};


export default PreferencesModal;
