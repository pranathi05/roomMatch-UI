import React, { useState,useEffect ,useCallback} from 'react';
import './styles.css';
import {  Col, Row } from 'react-bootstrap';
import PreferencesModal from './PreferencesModal/PreferencesModal';
import { getErrorMessage } from '../../../utils/helpers/index';
import {app} from '../../../base';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';




const db = app.firestore();
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
    })(({ theme, expand }) => ({
      transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
}));



const User=({ name, email, score, preferences ,userEmail}) =>{
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleOpen = () => setShowModal(true);
  const [img,setImg] = useState(null);
  console.log(preferences);
  const getImage = async ()=> {
    const imgRef = db.collection('images').doc(name);
    const doc = await imgRef.get();
    setImg(doc.data().Avatar);
  }
  getImage();
  return (
    <Col className="col-4">
    <Card sx={{ maxWidth: 345 }} className='user-card'>
      <CardHeader
        title={name}
        subheader={email}
      />
      <img
        className="imageIcon"
        src={img}
        alt="Image Not Found"
      />
      <CardActions disableSpacing>
        <ExpandMore
          onClick={handleOpen}
          aria-label="details"
        >
          <ExpandMoreIcon />
        </ExpandMore>
        <PreferencesModal
        username ={name}
        email ={email}
        preferences={preferences}
        show={showModal}
        handleClose={handleClose}
        />
      </CardActions>
    </Card>
  </Col >
  );
}
export default User;