import React from 'react';
import { Container, Modal, Row, Col } from 'react-bootstrap';
import { prefs } from '../../../Auth/Preferences/prefs';

const PreferencesModal = ({ preferences, show, handleClose }) => {
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
                {name !== 'rent'
                  ? preferences?.[name] === true
                    ? 'Yes'
                    : preferences?.[name] === false
                    ? 'No'
                    : preferences?.[name]
                  : `${preferences?.[name]?.from} - ${preferences?.[name]?.to}`}
              </Col>
            </Row>
          ))}
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default PreferencesModal;
