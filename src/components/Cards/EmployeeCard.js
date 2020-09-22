import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const EmployeeCard = ({ employee }) => {
  return (
    <Link
      style={{ margin: "8px" }}
      to={`employees/${employee.id}`}
      key={employee.id}
    >
      <Card bg="dark" text="light" style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>
            {employee.firstName + " " + employee.lastName}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {employee.position ? employee.position : "Position missing"}
          </Card.Subtitle>

          <Card.Link href="#">View projects</Card.Link>
          <br></br>
          <Card.Link href="#">Send email</Card.Link>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default EmployeeCard;
