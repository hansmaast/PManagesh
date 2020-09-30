import React, { useState } from "react";

export const ScaleOnHover = ( { scaleTo = 1.05, ms = 150, children, ...props } ) => {
  const [ scale, setScale ] = useState( 1 );

  let style = {
    transform: `scale(${ scale })`,
    transition:`transform ${ms}ms ease-out`
  };

  return (
      <div
          onMouseEnter={ () => setScale(scaleTo) }
          onMouseLeave={ () => setScale(1) }
          style={ style }
          {...props}
      >
        { children }
      </div>
  );
};