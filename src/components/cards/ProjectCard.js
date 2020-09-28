import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { ScaleOnHover } from "../effects/ScaleOnHover";
import { getStatusColor } from "../../style/utils/getStatusColor";


const ProjectCard = ( { project, refProp } ) => {

  let style = {
    textDecoration: 'none',
  };

  let footerStyle = {
    backgroundColor: getStatusColor( project.status )
  };

  return (
      <ScaleOnHover className={ 'm-2' }>
        <Link to={ `projects/${ project.id }` } style={ style }>
          <Card ref={ refProp } text="dark" style={ { width: "18rem", height: '12rem' } }>
            <Card.Body>
              <Card.Title>{ project.name }</Card.Title>
              <Card.Subtitle className="mb-2 text-muted"/>
              <Card.Text>{ project.description.slice( 0, 40 ) + '...' }</Card.Text>
            </Card.Body>
            <Card.Footer style={ footerStyle }>
              <Card.Subtitle className="mb-2 text-muted">{ project.status }</Card.Subtitle>
            </Card.Footer>
          </Card>
        </Link>
      </ScaleOnHover>
  );
};

export default ProjectCard;
