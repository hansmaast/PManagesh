import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { useProjectStore } from "../../store/projectStore";
import { Card } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";

export default ( { show, onHide, projectId } ) => {

  const projectDetails = useProjectStore( state => state.projectDetails );
  const fetchDetails = useProjectStore( state => state.fetchDetails );

  useEffect( () => {
    fetchDetails( projectId )
  }, [ fetchDetails, projectId ] );


  if ( !projectDetails ) {
    return <p>Loading..</p>
  }

  const { customer, employees } = projectDetails;

  return (
      <Modal
          show={ show }
          onHide={ onHide }
      >
        <Modal.Header closeButton>
          <Modal.Title>
            { projectDetails.name }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Company:</strong> { customer && customer.name }</p>
          <strong>Description:</strong>
          <p>
            { projectDetails.description }
          </p>
          <Accordion>
            <Card>
              <Accordion.Toggle as={ Button } variant={'link'} eventKey="0">
                View Employees on project
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <ul className={'py-4 mx-auto'}>
                  { employees && employees.map( e => (
                      <Link key={e.id} to={ `/employees/${ e.id }` }>
                        <li>{ e.firstName } { e.lastName }</li>
                      </Link>
                  ) ) }
                </ul>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Modal.Body>
      </Modal>
  );
}