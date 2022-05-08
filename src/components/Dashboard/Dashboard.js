import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { getUsers } from '../../utils/api';
import './styles.css';
import User from './User/User';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../../utils/helpers';
import DataLoader from '../Common/DataLoader';
const Dashboard = () => {
  const [score, setScore] = useState('10,8');
  const [users, setUsers] = useState([]);
  const [isFetchingUsers, setIsFetchingUsers] = useState(false);

  useEffect(() => {
    setIsFetchingUsers(true);
    const tempArray = score?.split(',');
    getUsers({ from: tempArray?.[0], to: tempArray?.[1] })
      .then(({ data }) => {
        setUsers(data ?? []);
        setIsFetchingUsers(false);
      })
      .catch((err) => {
        setUsers([]);
        setIsFetchingUsers(false);
        toast.error(getErrorMessage(err));
      });
  }, [score]);
  return (
    <div className='content'>
      <div className='content-header'>
        <div className='content-heading'>User Dashboard</div>
        <div>
          <Form.Group className='d-flex align-items-center'>
            <Form.Label className='score-label'>Match Level</Form.Label>
            <Form.Select
              className='text-input score-select-input'
              value={score}
              onChange={(e) => {
                setScore(e?.target?.value);
              }}
            >
              <option value='10,8'>10 - 8</option>
              <option value='8,6'>8 - 6</option>
              <option value='6,4'>6 - 4</option>
              <option value='3,0'>Below 4</option>
            </Form.Select>
          </Form.Group>
        </div>
      </div>
      {isFetchingUsers ? (
        <div className='screen-centered-div'>
          <DataLoader condition={isFetchingUsers} />
        </div>
      ) : users?.length === 0 ? (
        <div className='screen-centered-div'>No users found.</div>
      ) : (
        <div>
          {users?.map((user) => (
            <User {...user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
