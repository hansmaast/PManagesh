import React from "react";
import Projects from "../fakeData/Projects.json";
import { Card, Row, Col } from "react-bootstrap";

const TestCard = () => {
  return (
    <Row>
      {Projects.map((project) => {
        return (
          <Col xs={3} className="mb-5">
            <Card key={project.id} bg={"dark"} text={"light"}>
              <Card.Body>
                <Card.Title>{project.name}</Card.Title>
                <Card.Text>{project.description}</Card.Text>
                <Card.Text>Client: {project.employeeId}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default TestCard;
