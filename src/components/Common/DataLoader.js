import React from 'react';
import { BounceLoader } from 'react-spinners';
import PropagateLoader from 'react-spinners/PropagateLoader';

const DataLoader = ({ type, condition, size, color }) =>
  type === 'bounce' ? (
    <BounceLoader color={color || '#090970'} loading={condition} size={16} />
  ) : (
    <PropagateLoader
      color={color || '#090970'}
      loading={condition}
      size={size ?? 16}
    />
  );

export default DataLoader;
