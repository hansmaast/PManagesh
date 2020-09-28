import React from "react";


export const Flex = ({
    zIndex,
    position,
  backgroundColor,
  flexOrder,
  flexWrap,
  flexFlow,
  flexDirection,
  alignItems,
  justifyContent,
    wrap,
  children
}) => {

  const style = {
    width: '100%',
    display: 'flex',
    justifyContent: justifyContent,
    alignItems: alignItems,
    wrap: wrap,
    flexDirection: flexDirection,
    flexFlow: flexFlow,
    flexWrap: flexWrap,
    flexOrder: flexOrder,
    backgroundColor: backgroundColor,
    position: position,
    zIndex: zIndex
  };

  return (
      <div style={ style }>
        { children }
      </div>
  );

};