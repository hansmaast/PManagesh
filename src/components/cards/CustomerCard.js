import React, { useState } from "react";
import { Card } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import { useCustomerStore } from "../../store/customerStore";
import ProjectDetailsModal from "../modals/ProjectDetailsModal";
import { useProjectStore } from "../../store/projectStore";
import { Mail } from "react-feather";

const Customer = ( { customer } ) => {

  const projects = useCustomerStore( state => state.customerProjects );
  const fetchCustomerProjects = useCustomerStore( state => state.fetchCustomerProjects );
  const projectDetailId = useProjectStore(state => state.projectDetailId);
  const setProjectDetailId = useProjectStore(state => state.setProjectDetailId)
  const [ showDetails, setShowDetails ] = useState( false );

  const handleDetailChange = ( id ) => {
    setProjectDetailId( id );
    setShowDetails( true );
  };

  return (
      <Card bg="light" text="dark" style={ { margin: "8px", width: "18rem", height: '100%' } }>
        <Card.Header>
          <Card.Title className={'my-auto'}>
            { customer.name }
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Link href={ `mailto:${ customer.email }` }>
            <Mail size={15}/>
            {' '}
            { customer.email }
          </Card.Link>
          <Accordion className={'mt-4'}>
            <Card>
              <Accordion.Toggle
                  as={ Button }
                  onClick={ () => fetchCustomerProjects( customer ) }
                  variant={ 'link' }
                  eventKey={ '0' }
              >
                View projects
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={ '0' }>
                <ul className={ 'py-4 mx-auto' }>
                  { projects && projects.map( p => (
                      <li>
                        <Button
                            variant={ 'link' }
                            onClick={ () => handleDetailChange( p.id ) }
                        >
                          { p.name }
                        </Button>
                      </li>
                  ) ) }
                </ul>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Card.Body>

        <ProjectDetailsModal
            show={ showDetails }
            projectId={ projectDetailId }
            onHide={ () => setShowDetails( false ) }
        />
      </Card>
  );
};

export default Customer;
