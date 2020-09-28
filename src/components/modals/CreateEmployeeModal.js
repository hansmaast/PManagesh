import React, { useRef, useState } from "react";
import { Alert, Button, Col, Form, Modal } from "react-bootstrap";
import { addEmployeeToDb } from "../../db/actions";
import { employeeModel } from "../../db/models";
import { containsDuplicate } from "../../utils/containsDuplicate";
import { AlertWithLink } from "../alerts/AlertWithLink";
import { useEmployeeStore } from "../../store/employeeStore";
import * as blobUtil from "blob-util";

export const CreateEmployeeModal = ( { ...props } ) => {
  const currentEmployees = useEmployeeStore( state => state.employees )
  const [ employee, setEmployee ] = useState( { ...employeeModel } );
  const [ alertData, setAlertData ] = useState( { show: false, textInLink: '', id: null } )
  const [ employeeId, setEmployeeId ] = useState( null );
  const [ showSuccess, setShowSuccess ] = useState( false );
  const [ emailExists, setEmailExists ] = useState( false );
  const [ blob, setBlob ] = useState( new Blob() );
  const [ dataUrl, setDataUrl ] = useState( null );

  const handleEmployeeChange = e => {
    let value = e.target.value;

    if ( e.target.type === 'number' ) {
      value = parseInt( value );
    }

    if ( e.target.name === 'currentProjectIds' ) {
      return setEmployee( { ...employee, [e.target.name]: [ ...employee.currentProjectIds, value ] } )
    }

    setEmployee( { ...employee, [e.target.name]: value } )
  }

  const addEmployee = async () => {

    if ( containsDuplicate( currentEmployees, 'email', employee.email ) ) {
      return setEmailExists( true );
    }

    const { id } = await addEmployeeToDb( employee );
    if ( id ) {
      console.log( 'added employee: ', employee );
      setEmployee( { ...employeeModel } );
      setShowSuccess( true )
      setEmailExists( false );
      setEmployeeId( id );
      setTimeout( () => {
        setShowSuccess( false )
        setEmployeeId( null )
      }, 3000 );

    } else {
      console.log( 'could not add employee...' )
    }
  }

  async function encodeImageFileAsBlob( element ) {
    const file = element.files[0];
    console.log('file: ', file);
    const reader = new FileReader();
    reader.onloadend = function () {
      const result = reader.result;
      const blob = blobUtil.arrayBufferToBlob( result, file.type,  );
      setEmployee({...employee, imageBlob: blob});
    }
    reader.readAsDataURL( file );
  }

  const getDataUrlFromBlob = async ( blob ) => {
    let dataURL = await blobUtil.blobToBinaryString( blob );
    setDataUrl( dataURL );
    console.log( 'dataUrl: ', dataURL )
    return dataURL;
  }

  getDataUrlFromBlob( employee.imageBlob );

  const fileRef = useRef( null );

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

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                  onChange={ e => handleEmployeeChange( e ) }
                  name={ 'email' }
                  value={ employee.email }
                  type="email"
                  placeholder="john.doe@mail.com"
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

            <Form.Row>

              <Form.Group controlId="age">
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

              <Form.Group controlId="position">
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

              <Form.Group style={{display: 'flex'}}>
                <div >
                <Form.Label>Upload image</Form.Label>
                <Form.Control
                    ref={ fileRef }
                    accept=".jpeg, .png, .jpg, .svg"
                    type="file"
                    onChange={ () => encodeImageFileAsBlob( fileRef.current ) }
                />
                </div>
                <img style={ { objectFit: 'cover', border: '1px solid', borderRadius: 100, overflow: 'hidden' } }
                     width={ 100 } height={ 100 } src={ dataUrl }/>
              </Form.Group>
            </Form.Row>
            <Button type={ 'submit' }>Add employee</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <AlertWithLink
              text={ 'Added new employee' }
              linkTo={ `/employees/${ employeeId }` }
              linkText={ `${ employee.firstName } ${ employee.lastName }` }
              variant={ 'success' }
              show={ showSuccess }
          />
          {/*{*/ }
          {/*  showSuccess &&*/ }
          {/*  <Alert variant={ 'success' }>*/ }
          {/*    Added new employee{ ' ' }*/ }
          {/*    <Alert.Link*/ }
          {/*        href={ `/employees/${ employeeId }` }>{ `${ employee.firstName } ${ employee.lastName }` }</Alert.Link>!*/ }
          {/*  </Alert>*/ }
          {/*}*/ }
          <Button variant={ 'secondary' } onClick={ props.onHide }>Close</Button>
        </Modal.Footer>
      </Modal>
  );
}
