import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link, useRouteMatch } from "react-router-dom";
import { ScaleOnHover } from "../effects/ScaleOnHover";

const EmployeeCard = ( { employee, refProp } ) => {

  let { path, url } = useRouteMatch();

  const { id, firstName, lastName, position } = employee;

  return (
      <Link className={'mx-1'} to={ `${ url }/${ id }` } ref={ refProp }>
        <ScaleOnHover scaleTo={1.02}>
          <Card style={ { width: '18rem' } }>
            <Card.Img variant="top" src="holder.js/100px180"/>
            <Card.Body>
              <Card.Title>{ firstName } { lastName } </Card.Title>
              <Card.Text>
                { position ? position : 'No position set' }
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </ScaleOnHover>
      </Link>
  );
};

export default EmployeeCard;
