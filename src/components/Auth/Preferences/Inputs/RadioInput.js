import React from 'react';
import { Form } from 'react-bootstrap';

const RadioInput = ({ name, value, options, setValue }) => {
  return (
    <Form.Group className='mb-3'>
      {options?.map((option) => (
        <Form.Check
          type='radio'
          label={option}
          name={name}
          defaultChecked={option === 'Yes'}
          className='text-input'
          onClick={() => setValue(option === 'Yes')}
        />
      ))}
    </Form.Group>
  );
};

export default RadioInput;
