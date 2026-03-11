import React from 'react';

const Notify = ({title = `Record not found`}) => {
  return (
    <div className='text-center py-3'>
      <p className='text-center'>{title}</p>
    </div>
  );
};

export default Notify;