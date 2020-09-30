import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link, useRouteMatch } from "react-router-dom";
import { ScaleOnHover } from "../effects/ScaleOnHover";
import { setDataUrlFromBlob } from "../../utils/setDataUrlFromBlob";
import EmployeeDetailsModal from "../modals/EmployeeDetailsModal";

const EmployeeCard = ( { smallScreen, employee, refProp } ) => {

  const [ imgUrl, setImgUrl ] = useState( null );

  let { url } = useRouteMatch();

  const [ showModal, setShowModal ] = useState( false );
  const { id, firstName, lastName, position, imageBlob } = employee;

  const handleClick = () => {
    if ( smallScreen ) {
      setShowModal( true );
    }
      console.log('small ', showModal);
  };

  useEffect( () => {
    setDataUrlFromBlob( imageBlob, setImgUrl );
  }, [] )


  return (
      <>
        <Link className={ 'my-2' } style={ { marginRight: 15 } }
              to={ `${ url }/${ id }` } ref={ refProp }>
          <ScaleOnHover scaleTo={ 1.02 }>
            <Card onClick={ () => handleClick() } style={ { width: '18rem' } }>
              <Card.Header>
                <div style={ { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } }>
                  <Card.Title className={ 'm-0' }>{ firstName } { lastName } </Card.Title>

                  <img style={ { objectFit: 'cover', border: '1px solid', borderRadius: 100, overflow: 'hidden' } }
                       height={ 50 }
                       width={ 50 }
                       alt={ 'employee' }
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

        <EmployeeDetailsModal
            employeeId={employee.id}
            show={ showModal }
            onHide={ () => setShowModal( false ) }
        />
      </>
  );
};

export default EmployeeCard;
