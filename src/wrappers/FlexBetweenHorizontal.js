import Row from "react-bootstrap/Row";
import React from "react";
import { ArrowLeftCircle } from "react-feather";

export const FlexBetweenHorizontal = ({ children}) => {

  return (
      <Row style={ { display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' } }>
        {children}
      </Row>
  );

};