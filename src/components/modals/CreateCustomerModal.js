import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Modal } from "react-bootstrap";
import { addCostumerToDb } from "../../db/actions";
import { customerModel } from "../../db/models";
import { containsDuplicate } from "../../utils/containsDuplicate";
import { useCustomerStore } from "../../store/customerStore";
import { useProjectStore } from "../../store/projectStore";

export const CreateCustomerModal = ( { ...props } ) => {

  const currentCustomers = useCustomerStore( state => state.customers);
  const currentProjects = useProjectStore( state => state.projects);
  const fetchCurrentProjects = useProjectStore( state => state.fetchProjects)
  const [customer, setCustomer] = useState({...customerModel})
  const [ emailExists, setEmailExists ] = useState( false );
  const [ showSuccess, setShowSuccess ] = useState( false );

  const handleSubmit = async () => {

    if ( containsDuplicate( currentCustomers, 'email', customer.email ) ) {
      return setEmailExists( true );
    }

    const { id } = await addCostumerToDb(customer);
    if ( id ) {
      setCustomer( { ...customerModel } );
      setShowSuccess( true )
      setEmailExists( false );
      setTimeout( () => {
        setShowSuccess( false )
      }, 2500 );
    } else {
      console.log( 'could not add customer...' )
    }
  }

  useEffect(() => {
    fetchCurrentProjects();
  }, [])

  return (
      <Modal
          { ...props }
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add new Customer
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={ ( e ) => {
            e.preventDefault();
            console.log('submitting', )
            handleSubmit();
          } }>
            <Form.Row>
              <Form.Group controlId="firstName">
                <Form.Label>Customer name:</Form.Label>
                <Form.Control
                    onChange={ e => setCustomer({...customer, name: e.target.value}) }
                    name={ 'name' }
                    value={ customer.name }
                    type="text"
                    placeholder="Customer name"
                    required
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                  onChange={ e => setCustomer( {...customer, email: e.target.value} ) }
                  name={ 'email' }
                  value={ customer.email }
                  type="email"
                  placeholder="company@mail.com"
                  required
              />
              {
                emailExists &&
                <Form.Text id="emailExistsText" type={ 'invalid' }>
                  <Alert style={ { padding: 10, width: 'fit-content' } } variant={ 'warning' }>
                    This email already exists, choose new one!
                  </Alert>
                </Form.Text>
              }
            </Form.Group>

            <Form.Group as={ Col } controlId="formGridState">
              <Form.Label>Project</Form.Label>
              <Form.Control
                  onChange={ e => setCustomer( {...customer, projectIds: e.target.value} ) }
                  as="select"
                  defaultValue="Choose..."
                  name={ 'projectIds' }
              >
                <option>Choose...</option>
                {
                  currentProjects.map( e => (
                      <option
                          key={ e.id }
                          value={ e.id }
                      >
                        { e.name }
                      </option>
                  ) )
                }
              </Form.Control>
            </Form.Group>
            </Form.Row>

            <Button type={ 'submit' }>Add customer</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Alert
              variant={ 'success' }
              show={ showSuccess }
          >
            'Added new customer'
          </Alert>
          <Button variant={ 'secondary' } onClick={ props.onHide }>Close</Button>
        </Modal.Footer>
      </Modal>
  );
}
