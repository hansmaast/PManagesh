import React from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col, Container, CardDeck } from "react-bootstrap";
import { ArrowRight, Briefcase, Folder, User } from "react-feather";

export default () => {
  return (
    <div>
      <Container>
        <Row>
          <Col
            xs={12}
            sm={8}
            md={10}
            lg={12}
            xl={12}
            style={{ margin: "5rem" }}
            className="mb-5"
          >
            <CardDeck>
              <Link to="/projects" style={{ textDecoration: "none" }}>
                <Card
                  bg="dark"
                  text="light"
                  style={{
                    width: "18rem",
                    height: "15rem",
                    marginBottom: "2rem",
                  }}
                >
                  <Card.Img variant="top" />
                  <Card.Body>
                    <Card.Title>Projects</Card.Title>
                    <Card.Text>Full list of all your projects</Card.Text>
                    <Folder />
                  </Card.Body>
                  <Card.Footer>
                    <ArrowRight />
                  </Card.Footer>
                </Card>
              </Link>
              <Link to="/costumers" style={{ textDecoration: "none" }}>
                <Card
                  bg="dark"
                  text="light"
                  style={{
                    width: "18rem",
                    height: "15rem",
                    marginBottom: "2rem",
                  }}
                >
                  <Card.Img variant="top" />
                  <Card.Body>
                    <Card.Title>Clients</Card.Title>
                    <Card.Text>Full overview over all your clients</Card.Text>
                    <Briefcase />
                  </Card.Body>
                  <Card.Footer>
                    <ArrowRight />
                  </Card.Footer>
                </Card>
              </Link>
              <Link to="/employees" style={{ textDecoration: "none" }}>
                {" "}
                <Card
                  bg="dark"
                  text="light"
                  style={{
                    width: "18rem",
                    height: "15rem",
                    marginBottom: "2rem",
                  }}
                >
                  <Card.Img variant="top" />
                  <Card.Body>
                    <Card.Title>Employees</Card.Title>
                    <Card.Text>Full overview over all employees</Card.Text>
                    <User />
                  </Card.Body>
                  <Card.Footer>
                    <ArrowRight />
                  </Card.Footer>
                </Card>
              </Link>
            </CardDeck>
          </Col>
        </Row>
        <h1>JEOE</h1>
      </Container>
    </div>
  );
};
