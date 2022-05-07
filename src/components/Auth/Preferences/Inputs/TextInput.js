import React from 'react';
import { Form } from 'react-bootstrap';

const TextInput = ({
  didNextBtnClick,
  type,
  value,
  setValue,
  handleEnterPress,
}) => {
  return (
    <Form.Group className='mb-3'>
      <Form.Control
        type={type}
        min={0}
        value={value}
        onChange={(e) =>
          setValue(
            type === 'number' ? parseInt(e?.target?.value) : e?.target?.value
          )
        }
        autoComplete='off'
        className='text-input'
        onKeyDown={handleEnterPress}
      />
      {didNextBtnClick &&
        ((type === 'text' && !value) ||
          (type === 'number' && (value === null || value === undefined))) && (
          <div className='auth-error'>Enter some value</div>
        )}
    </Form.Group>
  );
};

export default TextInput;
