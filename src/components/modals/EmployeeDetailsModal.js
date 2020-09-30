import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { employeeModel } from "../../db/models";
import { getEmployeeById, getProjectsFromEmployee } from "../../db/actions";
import { setDataUrlFromBlob } from "../../utils/setDataUrlFromBlob";

export default ( { show, onHide, employeeId } ) => {

  const [employee, setEmployee] = useState({...employeeModel});
  const [projects, setProjects] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);

  const getData = async () => {
    const employee = await getEmployeeById(employeeId);
    setEmployee( {...employee} );

    const projectsFromDb = await getProjectsFromEmployee(employee)
    setProjects([...projectsFromDb])
  }

  useEffect( () => {
    getData();
  }, [])

  useEffect(() => {
    setDataUrlFromBlob(employee.imageBlob, setImageUrl);
  }, [employee.imageBlob]);

  const {firstName, lastName, position} = employee;
  return (
      <Modal
          show={ show }
          onHide={ onHide }
      >
        <Modal.Header closeButton>
          <Modal.Title>
            { firstName } { lastName }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{padding: '2rem', borderRadius: 5, background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>

            <img
                alt={'employee'}
                style={ { objectFit: 'cover', borderRadius: 100, overflow: 'hidden' } }
                width={200}
                height={200}
                src={ imageUrl }
            />
            <p>{position}</p>
            <h4>Current projects:</h4>
            <ul>
              {
                projects.length > 0
                    ? projects.map( p => <li key={p.id}>{p.name}</li>)
                    : <p>None..</p>

              }
            </ul>
          </div>
        </Modal.Body>
      </Modal>
  );
}