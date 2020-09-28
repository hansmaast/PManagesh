import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link, useRouteMatch } from "react-router-dom";
import { ScaleOnHover } from "../effects/ScaleOnHover";
import * as blobUtil from "blob-util";

const EmployeeCard = ( { employee, refProp } ) => {

  const [ imgUrl, setImgeUrl ] = useState( null );

  let { url } = useRouteMatch();

  const { id, firstName, lastName, position, imageBlob } = employee;

  const setDataUrl = async () => {
    if ( imageBlob ) {
      const dataUrlFromBlob = await blobUtil.blobToDataURL( imageBlob );
      setImgeUrl( dataUrlFromBlob );
    }
  }

  useEffect( () => {
    setDataUrl();
  }, [] )


  return (
      <Link style={ { marginRight: 15 } } to={ `${ url }/${ id }` } ref={ refProp }>
        <ScaleOnHover scaleTo={ 1.02 }>
          <Card style={ { width: '18rem' } }>
            <Card.Header>
              <div style={ { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } }>
                <Card.Title className={ 'm-0' }>{ firstName } { lastName } </Card.Title>

                  <img style={ { objectFit: 'cover', border: '1px solid', borderRadius: 100, overflow: 'hidden' } }
                       height={50}
                       width={50}
                       alt={'employee'}
                       src={ imgUrl }/>
              </div>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                { position ? position : 'No position set' }
              </Card.Text>
              <Button variant="primary">View employee details</Button>
            </Card.Body>
          </Card>
        </ScaleOnHover>
      </Link>
  );
};

export default EmployeeCard;
