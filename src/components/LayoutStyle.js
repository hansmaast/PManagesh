import React from "react";
import {Container, Row} from "react-bootstrap";

const LayoutStyle = ({ children }) => {
  return (
    <Container style={{ maxWidth: "1600px" }}>
      <Row style={{ display: "flex", justifyContent: "center" }}>
        {children}
      </Row>
    </Container>
  );
};

export default LayoutStyle;
