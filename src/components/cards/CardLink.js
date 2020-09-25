import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { MoreVertical } from "react-feather";
import React from "react";

export const CardLink = ( { to, title, text, icon, refProp } ) => {
  return <Link to={ to } ref={ refProp } style={{marginRight: 20}}>
    <Card
        text={ 'dark' }
        color={ '' }
        style={ {
          width: "18rem",
          height: "15rem",
          borderRadius: 10
        } }
    >
      <Card.Img variant="top"/>
      <Card.Body>
        <Card.Title>{ title } </Card.Title>
        <Card.Text>{ text } </Card.Text>
        { icon }
      </Card.Body>
      <Card.Footer>
        <MoreVertical className={ 'mr-0' }/>
      </Card.Footer>
    </Card>
  </Link>;
}
