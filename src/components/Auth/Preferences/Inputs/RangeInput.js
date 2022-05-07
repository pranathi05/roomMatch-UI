import React from 'react';
import { Form } from 'react-bootstrap';

const RangeInput = ({ didNextBtnClick, value, setValue, handleEnterPress }) => {
  return (
    <>
      <Form.Group className='mb-3 range-component'>
        <div>
          <Form.Label>From</Form.Label>
          <Form.Control
            type='number'
            min={1}
            autoComplete='off'
            className='text-input'
            value={value?.from}
            onChange={(e) => {
              if (parseInt(e?.target?.value) > value?.to) {
                setValue({
                  from: parseInt(e?.target?.value),
                  to: parseInt(e?.target?.value),
                });
              } else {
                setValue({ ...value, from: parseInt(e?.target?.value) });
              }
            }}
            onKeyDown={handleEnterPress}
          />
        </div>
        <div>
          <Form.Label>To</Form.Label>
          <Form.Control
            type='number'
            min={value?.from}
            autoComplete='off'
            className='text-input'
            value={value?.to}
            onChange={(e) => {
              if (parseInt(e?.target?.value) < value?.from) {
                setValue({
                  from: parseInt(e?.target?.value),
                  to: parseInt(e?.target?.value),
                });
              } else {
                setValue({ ...value, to: parseInt(e?.target?.value) });
              }
            }}
            onKeyDown={handleEnterPress}
          />
        </div>
      </Form.Group>
      {didNextBtnClick &&
        (!value?.from || !value?.to || value?.from > value?.to) && (
          <div className='auth-error'>Enter valid range values</div>
        )}
    </>
  );
};

export default RangeInput;
