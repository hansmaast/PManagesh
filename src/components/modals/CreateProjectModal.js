import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal } from "react-bootstrap";
import { addProjectToDb, getCostumers, getEmployees } from "../../db/actions";
import { projectModel } from "../../db/models";
import { AlertWithLink } from "../alerts/AlertCostume";

export const CreateProjectModal = props => {
  const [ project, setProject ] = useState( { ...projectModel } );
  const [ alertData, setAlertData ] = useState( { show: false, textInLink: '', id: null } )
  const [ allCostumers, setAllCostumers ] = useState( [ {} ] );
  const [ allEmployees, setAllEmployees ] = useState( [ {} ] );

  const handleChange = (e) => {
    let value = e.target.value;


    if ( e.target.name.includes( 'Id' ) ) {
      value = parseInt( value );
    }

    if ( e.target.name === 'employeeIds' ) {
      return setProject( { ...project, [e.target.name]: [ ...project.employeeIds, value ] } )
    }

    setProject({ ...project, [e.target.name]: value });
  };

  const addProject = async () => {



    const { id } = await addProjectToDb( project );
    setAlertData( { show: true, textInLink: project.name, id: id } )
    setProject( { ...projectModel } );
    setTimeout( () => {
      setAlertData( { show: false, ...alertData } )
    }, 2500 );
  }

  const getData = async () => {
    const costumers = await getCostumers();
    setAllCostumers( [ ...costumers ] );
    const employees = await getEmployees();

    setAllEmployees( [ ...employees ] );
  }

  useEffect( () => {
    getData();
  }, [] )

  return (
      <Modal
          { ...props }
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create a project
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Row>
              <Form.Group as={ Col } controlId="formGridEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control onChange={ e => handleChange( e ) } name={ 'name' } value={ project.name } type="text"
                              placeholder="Project name" required/>
              </Form.Group>

              <Form.Group as={ Col } controlId="formGridPassword">
                <Form.Label>Costumer</Form.Label>
                <Form.Control as="select" defaultValue="Choose costumer..." onChange={ e => handleChange( e ) }
                              name={ 'costumerId' }>
                  <option>Choose...</option>
                  {
                    allCostumers.map( c => <option key={ c.id } value={ c.id }>{ c.name }</option> )
                  }
                </Form.Control>
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="formGridDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control onChange={ e => handleChange( e ) } value={ project.description } name={ 'description' }
                            as="textarea" rows="3"/>
            </Form.Group>

            <Form.Row>

              <Form.Group as={ Col } controlId="formGridState">
                <Form.Label>Employee</Form.Label>
                <Form.Control as="select" defaultValue="Choose..." onChange={ e => handleChange( e ) }
                              name={ 'employeeIds' }>
                  <option>Choose...</option>
                  {
                    allEmployees.map( e => <option key={ e.id }
                                                   value={ e.id }>{ `${ e.firstName } ${ e.lastName }` }</option> )
                  }
                </Form.Control>
              </Form.Group>

              <Form.Group as={ Col } id="formGridCheckbox">
                <Form.Label>Status</Form.Label>
                { [ 'Not started', 'In progress', 'Done' ].map( status => {
                  return (
                      <Form.Check
                          key={ status }
                          id={ `${ status }-radio` }
                          name={ 'status' }
                          onChange={ e => {
                            handleChange( e )
                          } }
                          value={ status }
                          type="radio"
                          label={ status }
                      />
                  )
                } ) }
              </Form.Group>

            </Form.Row>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <AlertWithLink
              show={ true }
              variant={ 'success' }
              text={ 'Success  text' }
              linkText={ alertData.textInLink }
              linkTo={ `/projects/${ alertData.id }` }
          />
          <Button variant={ 'secondary' } onClick={ props.onHide }>Close</Button>
          <Button onClick={ () => addProject() }>Add project</Button>
        </Modal.Footer>
      </Modal>
  );
};
