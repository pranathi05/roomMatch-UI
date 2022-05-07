import React from 'react';
import { Form } from 'react-bootstrap';
import { getTimeOptions } from '../../../../utils/helpers';

const SelectInput = ({ value, setValue }) => {
  return (
    <Form.Group className='mb-3'>
      <Form.Select
        className='text-input'
        value={value}
        onChange={(e) => setValue(e?.target?.value)}
      >
        {getTimeOptions()?.map((option) => (
          <option value={option}>{option}</option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export default SelectInput;
