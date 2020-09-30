import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEmployeeById, getProjectsFromEmployee } from "../../db/actions";
import { employeeModel } from "../../db/models";
import { setDataUrlFromBlob } from "../../utils/setDataUrlFromBlob";

export default () => {

  const [employee, setEmployee] = useState({...employeeModel});
  const [projects, setProjects] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);

  let { id } = useParams();
  const intId = parseInt( id );

  const getData = async () => {
    const employee = await getEmployeeById(intId);
    setEmployee( {...employee} );

    const projectsFromDb = await getProjectsFromEmployee(employee)
    setProjects([...projectsFromDb])
  }

  useEffect( () => {
    getData();
  }, [intId] )

  useEffect(() => {
    setDataUrlFromBlob(employee.imageBlob, setImageUrl);
  }, [employee.imageBlob]);

    const {firstName, lastName, position} = employee;
  return (
      <div style={{padding: '2rem', borderRadius: 5, background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>

        <img
            alt={'employee'}
            style={ { objectFit: 'cover', borderRadius: 100, overflow: 'hidden' } }
            width={200}
            height={200}
        src={ imageUrl }
        />
        <h3>{firstName} {lastName}</h3>
        <p>{position}</p>
        <h4>Current projects:</h4>
        <ul>
          {
            projects.length > 0
                ? projects.map( p => <li>{p.name}</li>)
                : <p>None..</p>

          }
        </ul>
      </div>
  );
}