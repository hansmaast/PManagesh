import backgroundImage from "../../style/images/sincerely-media-FPrniQ84dEk-unsplash.jpg";
import React from "react";

export const BackgroundImage = ( { children } ) => {

  const backgroundStyle = {
    overflowY: 'scroll',
    width: '100vw',
    height: '100vh',
    backgroundSize: 'cover',
    backgroundImage: `url(${ backgroundImage })`,
  };

  return <div style={ backgroundStyle }>{ children }</div>

}