import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import './styles.css';
import PreferencesModal from './PreferencesModal/PreferencesModal';
const User = ({ name, email, score, preferences }) => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleOpen = () => setShowModal(true);
  return (
    <Card className='user-card'>
      <div className='user-info'>
        <div>{name}</div>
        <div>·</div>
        <div>{email}</div>
      </div>
      <div className='user-button'>
        <span onClick={handleOpen}>Details</span>
      </div>
      <PreferencesModal
        name ={name}
        email ={email}
        preferences={preferences}
        show={showModal}
        handleClose={handleClose}
      />
    </Card>
  );
};

export default User;
