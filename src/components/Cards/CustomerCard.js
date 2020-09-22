import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Customer = ({ customer }) => {
  return (
    <Link
      style={{ margin: "8px" }}
      to={`custumers/${customer.id}`}
      key={customer.id}
    >
      <Card bg="dark" text="light" style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{customer.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            <p>Put customer name here</p>
          </Card.Subtitle>

          <Card.Link href="#">View projects</Card.Link>
          <br></br>
          <Card.Link href="#">Send email</Card.Link>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default Customer;
