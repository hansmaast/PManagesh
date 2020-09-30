import React from 'react';
import { largeScreen, navBarHeight } from "../../style/dimensions";
import Container from "react-bootstrap/Container";

const MainWrapper = ({children}) => {
  return (
      <Container className={ 'px-5 py-5' } style={ { maxWidth: largeScreen, marginTop: navBarHeight } }>
        {children}
      </Container>
  );
};

export default MainWrapper;