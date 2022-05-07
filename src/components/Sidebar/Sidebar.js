import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '../../utils/api';
import { setAppUser } from '../../redux/action-creators';
import './styles.css';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../../utils/helpers';
import DataLoader from '../Common/DataLoader';
import LogoutModal from './LogoutModal';
const Sidebar = () => {
  const dispatch = useDispatch();
  const { email } = JSON.parse(localStorage?.getItem('app-user'));
  const [selectedItem, setSelectedItem] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [isFetchingAppUser, setIsFetchingAppUser] = useState(false);

  const appUser = useSelector((state) => state?.auth?.appUser);

  const navigate = useNavigate();

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const onLogout = () => {
    localStorage.removeItem('app-user');
    navigate('/login');
  };
  const selectItem = (item) => {
    setSelectedItem(item);
    navigate(`/${item}`);
  };
  useEffect(() => {
    navigate(
      window?.location?.pathname !== '/profile' ? '/dashboard' : '/profile'
    );
    setSelectedItem(
      window?.location?.pathname !== '/profile'
        ? 'dashboard'
        : window?.location?.pathname?.slice(1)
    );
    setIsFetchingAppUser(true);
    getUserInfo()
      .then(({ data }) => {
        dispatch(setAppUser(data?.name));
        setIsFetchingAppUser(false);
      })
      .catch((error) => {
        toast.error(getErrorMessage(error));
        dispatch(setAppUser('-'));
        setIsFetchingAppUser(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className='sidebar'>
      <div className='sidebar-header'>
        {isFetchingAppUser ? (
          <DataLoader condition={isFetchingAppUser} />
        ) : (
          <>
            <div className='app-user-name'>
              <span>{appUser}</span>
            </div>
            <div className='app-user-email'>{email}</div>
          </>
        )}
      </div>
      <div className='sidebar-items'>
        <div
          className={`sidebar-item ${
            selectedItem === 'dashboard' ? 'selected-item' : ''
          }`}
          onClick={() => selectItem('dashboard')}
        >
          Dashboard
        </div>
        <div
          className={`sidebar-item ${
            selectedItem === 'profile' ? 'selected-item' : ''
          }`}
          onClick={() => selectItem('profile')}
        >
          Profile
        </div>
        <div className='sidebar-item' onClick={handleOpen}>
          Logout
        </div>
      </div>
      <LogoutModal
        show={showModal}
        handleClose={handleClose}
        confirmHandler={onLogout}
      />
    </div>
  );
};

export default Sidebar;
