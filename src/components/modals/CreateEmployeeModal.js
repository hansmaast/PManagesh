import React, { useEffect, useRef, useState } from "react";
import { Alert, Button, Col, Form, Modal } from "react-bootstrap";
import { addEmployeeToDb } from "../../db/actions";
import { employeeModel } from "../../db/models";
import { containsDuplicate } from "../../utils/containsDuplicate";
import { useEmployeeStore } from "../../store/employeeStore";
import * as blobUtil from "blob-util";
import { setDataUrlFromBlob } from "../../utils/setDataUrlFromBlob";
import { useProjectStore } from "../../store/projectStore";

export const CreateEmployeeModal = ( { ...props } ) => {
  const currentEmployees = useEmployeeStore( state => state.employees );
  const currentProjects = useProjectStore( state => state.projects);
  const fetchCurrentProjects = useProjectStore( state => state.fetchProjects)
  const [ employee, setEmployee ] = useState( { ...employeeModel } );
  const [ alertData, setAlertData ] = useState( {
    success: false,
    successText: '',
    emailExists: false,
    id: null
  } )
  const [ dataUrl, setDataUrl ] = useState( null );

  const validateEmail = e => {
    if ( containsDuplicate( currentEmployees, 'email', e.target.value ) ) {
      console.log( 'duplicate found', alertData );
      setAlertData( { ...alertData, emailExists: true } );
    } else {
      console.log( 'no duplicate' )
      setAlertData( { ...alertData, emailExists: false } );
    }
  }

  async function encodeImageFileAsBlob( element ) {
    const file = element.files[0];
    const reader = new FileReader();
    reader.onloadend = function () {
      const result = reader.result;
      const blob = blobUtil.arrayBufferToBlob( result, file.type, );
      console.log( 'blob: ', blob );
      setEmployee( { ...employee, imageBlob: blob } );
    }
    reader.readAsDataURL( file );
  }

  const handleEmployeeChange = e => {
    let value = e.target.value;
    if ( e.target.type === 'number' ) {
      value = parseInt( value );
    }
    if ( e.target.name === 'projectIds' ) {
      return setEmployee( { ...employee, [e.target.name]: [ ...employee.projectIds, value ] } )
    }
    if ( e.target.name === 'email' ) {
      validateEmail( e );
    }
    setEmployee( { ...employee, [e.target.name]: value } )
  }

  const addEmployee = async () => {
    if ( alertData.emailExists ) {
      return setAlertData( { emailExists: true, ...alertData } );
    }
    try {
      const { id } = await addEmployeeToDb( employee );
      if ( id ) {
        setAlertData( {
          show: true,
          successText: `Added employee ${ employee.firstName }`,
          emailExists: false,
          id: employee.id
        } );
        setEmployee( { ...employeeModel } );
        setTimeout( () => {
          setAlertData( { show: false, ...alertData } );
        }, 2500 );
      } else {
        console.log( 'could not add employee...' )
      }
    } catch (e) {
      console.error( e )
    }
  }

  const fileRef = useRef( null );

  useEffect( () => {
    setDataUrlFromBlob( employee.imageBlob, setDataUrl )
  }, [ employee.imageBlob ] )

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
            Add new Employee
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={ ( e ) => {
            e.preventDefault();
            addEmployee();
          } }>

            <Form.Row>
              <Form.Group as={ Col } controlId="firstName">
                <Form.Label>First name:</Form.Label>
                <Form.Control
                    onChange={ e => handleEmployeeChange( e ) }
                    name={ 'firstName' }
                    value={ employee.firstName }
                    type="text"
                    placeholder="John"
                    required
                />
              </Form.Group>
              <Form.Group as={ Col } controlId="lastName">
                <Form.Label>Last name:</Form.Label>
                <Form.Control
                    onChange={ e => handleEmployeeChange( e ) }
                    name={ 'lastName' }
                    value={ employee.lastName }
                    type="text"
                    placeholder="Doe"
                    required
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    onChange={ e => handleEmployeeChange( e ) }
                    name={ 'email' }
                    value={ employee.email }
                    type="email"
                    placeholder="john.doe@mail.com"
                    required
                />
                <Alert
                    className={ 'mr-auto py-1 px-2 my-2' }
                    show={ alertData.emailExists }
                    style={ { padding: 10, width: 'fit-content' } }
                    variant={ 'warning' }>
                  ✋ This email already exists, choose new one!
                </Alert>
              </Form.Group>

              <Form.Group as={ Col } controlId="formGridState">
                <Form.Label>Project</Form.Label>
                <Form.Control
                    onChange={ e => handleEmployeeChange( e ) }
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

            <Form.Row>
              <Form.Group as={ Col } controlId="age">
                <Form.Label>Age</Form.Label>
                <Form.Control
                    onChange={ e => handleEmployeeChange( e ) }
                    name={ 'age' }
                    value={ employee.age }
                    type="number"
                    placeholder='42'
                    required
                />
              </Form.Group>
              <Form.Group as={ Col } controlId="position">
                <Form.Label>Position</Form.Label>
                <Form.Control as={ 'select' }
                              onChange={ e => handleEmployeeChange( e ) }
                              name={ 'position' }
                              value={ employee.position }
                              type="text"
                              defaultValue={ 'Choose position..' }
                              required
                >
                  <option value={ "" }>Choose..</option>
                  <option value={ 'Developer' }>Developer</option>
                  <option value={ 'Musketeer' }>Musketeer</option>
                  <option value={ 'Designer' }>Designer</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>

            <Form.Row className={'my-4'}>
              <Form.Group as={ Col } >
                <div style={{flexDirection: 'column', height:'100%', display: 'flex', justifyContent: 'space-around'}}>
                <Form.Label>Upload image</Form.Label>
                <Form.Control
                    ref={ fileRef }
                    accept=".jpeg, .png, .jpg, .svg"
                    type="file"
                    onChange={ () => encodeImageFileAsBlob( fileRef.current ) }
                />
                </div>
              </Form.Group>
              <Form.Group as={Col}>
                <div style={{ height:'100%', display: 'flex', justifyContent: 'center'}}>
                  {
                    dataUrl
                    ? <img
                            className={'m-auto'}
                            style={ { objectFit: 'cover', border: '1px solid', borderRadius: 100, overflow: 'hidden' } }
                            alt={ 'employee' }
                            width={ 100 }
                            height={ 100 }
                            src={ dataUrl }
                        />
                        : <p>Please select a photo..</p>
                  }
                </div>
              </Form.Group>
            </Form.Row>

            <Button type={ 'submit' }>Add employee</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Alert
              className={ 'mr-auto py-1 px-2' }
              show={ alertData.success }
              variant={ 'success' }>
            { alertData.successText }
          </Alert>
          <Button variant={ 'secondary' } onClick={ props.onHide }>Close</Button>
        </Modal.Footer>
      </Modal>
  );
}
