import Row from "react-bootstrap/Row";
import React from "react";
import { ArrowLeftCircle } from "react-feather";

export const FlexBetweenHorizontal = ({ children}) => {

  return (
      <Row className={'px-3'} style={ {  border: '1px solid',   } }>
        {children}
      </Row>
  );

};