import React from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col, Container, CardDeck } from "react-bootstrap";

export default () => {
  return (
    <div>
      <Container style={{ margin: "5rem" }}>
        <Row>
          <CardDeck>
            <Link to="/projects">
              <Card bg="dark" text="light" className="md-5">
                <Card.Img variant="top" />
                <Card.Body>
                  <Card.Title>Projects</Card.Title>
                  <Card.Text>Full list of all your projects</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Last updated 2 days ago</small>
                </Card.Footer>
              </Card>
            </Link>
            <Link to="/costumers">
              <Card bg="dark" text="light">
                <Card.Img variant="top" />
                <Card.Body>
                  <Card.Title>Clients</Card.Title>
                  <Card.Text>Full overview over all your clients</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Last updated 2 weeks ago</small>
                </Card.Footer>
              </Card>
            </Link>
            <Link to="/employees">
              {" "}
              <Card bg="dark" text="light">
                <Card.Img variant="top" />
                <Card.Body>
                  <Card.Title>Employees</Card.Title>
                  <Card.Text>Full overview over all employees</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Last updated 3 mins ago</small>
                </Card.Footer>
              </Card>
            </Link>
          </CardDeck>
        </Row>
      </Container>
    </div>
  );
};
