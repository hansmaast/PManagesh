import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal } from "react-bootstrap";
import { addProjectToDb } from "../../db/actions";
import { projectModel } from "../../db/models";
import { useCustomerStore } from "../../store/customerStore";
import { useEmployeeStore } from "../../store/employeeStore";
import Alert from "react-bootstrap/Alert";

export const CreateProjectModal = props => {
  const [ project, setProject ] = useState( { ...projectModel } );
  const [ alertData, setAlertData ] = useState( { show: false, text: '', id: null } )

  const customers = useCustomerStore( state => state.customers );
  const fetchCustomers = useCustomerStore( state => state.fetchCustomers );

  const employees = useEmployeeStore( state => state.employees );
  const fetchEmployees = useEmployeeStore( state => state.fetchEmployees );

  const handleChange = ( e ) => {
    let value = e.target.value;

    if ( e.target.name.includes( 'Id' ) ) {
      value = parseInt( value );
    }

    if ( e.target.name === 'employeeIds' ) {
      return setProject( { ...project, [e.target.name]: [ ...project.employeeIds, value ] } )
    }

    setProject( { ...project, [e.target.name]: value } );
  };

  const addProject = async () => {
    const { id } = await addProjectToDb( project );
    setAlertData( {
      success: true,
      successText: `Yey! ${ project.name } saved..💾`,
      id: id
    } );
    setProject( { ...projectModel } );
    setTimeout( () => {
      setAlertData( { success: false, ...alertData } )
    }, 2500 );
  }

  const handleSubmit = e => {
    e.preventDefault();
    addProject();
  }

  useEffect( () => {
    fetchCustomers();
    fetchEmployees();
  }, [ fetchCustomers, fetchEmployees ] )

  return (
      <Modal size="md"
             aria-labelledby="contained-modal-title-vcenter"
             centered
             { ...props }
      >
        <Modal.Header closeButton className={ 'px-4' }>
          <Modal.Title id="contained-modal-title-vcenter">
            Create a project
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className={ 'px-4' }>
          <Form onSubmit={ ( e ) => handleSubmit( e ) }>
            <Form.Row>
              <Form.Group as={ Col } controlId="formGridEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    onChange={ e => handleChange( e ) }
                    name={ 'name' }
                    value={ project.name }
                    type="text"
                    placeholder="Project name"
                    required
                />
              </Form.Group>

              <Form.Group as={ Col } controlId="formGridPassword">
                <Form.Label>Costumer</Form.Label>
                <Form.Control
                    onChange={ e => handleChange( e ) }
                    as="select"
                    defaultValue="Choose costumer..."
                    name={ 'costumerId' }
                >
                  <option>Choose...</option>
                  {
                    customers.map( c => <option key={ c.id } value={ c.id }>{ c.name }</option> )
                  }
                </Form.Control>
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="formGridDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                  onChange={ e => handleChange( e ) }
                  value={ project.description }
                  name={ 'description' }
                  as="textarea"
                  rows="3"
              />
            </Form.Group>

            <Form.Row>
              <Form.Group as={ Col } controlId="formGridState">
                <Form.Label>Employee</Form.Label>
                <Form.Control
                    onChange={ e => handleChange( e ) }
                    as="select"
                    defaultValue="Choose..."
                    name={ 'employeeIds' }
                >
                  <option>Choose...</option>
                  {
                    employees.map( e => (
                        <option
                            key={ e.id }
                            value={ e.id }
                        >
                          { `${ e.firstName } ${ e.lastName }` }
                        </option>
                    ) )
                  }
                </Form.Control>
              </Form.Group>

              <Form.Group as={ Col } id="formGridCheckbox">
                <Form.Label>Status</Form.Label>
                { [ 'Not started', 'In progress', 'Done' ].map( status => {
                  return (
                      <Form.Check
                          onChange={ e => handleChange( e ) }
                          key={ status }
                          id={ `${ status }-radio` }
                          name={ 'status' }
                          value={ status }
                          type="radio"
                          label={ status }
                      />
                  )
                } ) }
              </Form.Group>
            </Form.Row>

            <Button type={ 'submit ' }>Add project</Button>
          </Form>
        </Modal.Body>

        <Modal.Footer className={ 'px-4' }>
          <Alert
              className={ 'mr-auto py-1 px-2' }
              show={ alertData.show }
              variant={ 'success' }>
            { alertData.text }
          </Alert>
          <Button variant={ 'secondary' } onClick={ props.onHide }>Close</Button>
        </Modal.Footer>
      </Modal>
  );
};
