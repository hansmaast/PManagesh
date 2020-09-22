import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const ProjectCard = ({project}) => {
  return (
    <Link style={{margin: "8px"}} to={`project/${project.id}`} key={project.id}>
      <Card bg="dark" text="light" style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{project.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
          <Card.Text style={{maxHeight: "10rem", overflow: "auto"}}>{project.description}</Card.Text>

        </Card.Body>
      </Card>
    </Link>
  );
};

export default ProjectCard;
