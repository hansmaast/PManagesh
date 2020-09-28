import React from 'react';
import { largeScreen } from "../../style/dimensions";
import Container from "react-bootstrap/Container";

const MainWrapper = ({children}) => {
  return (
      <Container className={ 'px-5 py-5' } style={ { maxWidth: largeScreen, paddingTop: 40 } }>
        {children}
      </Container>
  );
};

export default MainWrapper;