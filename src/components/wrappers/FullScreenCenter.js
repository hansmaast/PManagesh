import React from 'react';

const FullScreenCenter = ({children}) => {
  const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',
  };
  return (
      <div style={style}>
        {children}
      </div>
  );
};

export default FullScreenCenter;