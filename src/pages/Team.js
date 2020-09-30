import React from "react";
import { Card, CardDeck, Col, Row } from "react-bootstrap";
import { GitHub, User } from "react-feather";

const Team = () => {
  return (
    <div>
      <Row className="mb-5">
        <CardDeck>
          <Col>
            <Card style={{ width: "250px", height: "300px" }}>
              <Card.Header>
                <Card.Title>
                  <User />
                  Hans Maast
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Text>He likes coding and pils</Card.Text>
              </Card.Body>
              <Card.Footer>
                <GitHub />
                <Card.Subtitle className="mt-1 text-muted">
                  Github
                </Card.Subtitle>
              </Card.Footer>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: "250px", height: "300px" }}>
              <Card.Header>
                <Card.Title>
                  <User />
                  Per-Kristian Vinje
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Text>He likes guitar and bootstrap grid</Card.Text>
              </Card.Body>
              <Card.Footer>
                <GitHub />
                <Card.Subtitle className="mt-1 text-muted">
                  Github
                </Card.Subtitle>
              </Card.Footer>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: "250px", height: "300px" }}>
              <Card.Header>
                <Card.Title>
                  <User />
                  Martin Molvær
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Text>He likes food and icons</Card.Text>
              </Card.Body>
              <Card.Footer>
                <GitHub />
                <Card.Subtitle className="mt-1 text-muted">
                  Github
                </Card.Subtitle>
              </Card.Footer>
            </Card>
          </Col>
        </CardDeck>
      </Row>
    </div>
  );
};

export default Team;
