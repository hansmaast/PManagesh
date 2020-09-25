import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEmployeeById, getProjectById, getProjectsFromEmployee } from "../../db/actions";
import { employeeModel } from "../../db/models";

export default ({}) => {

  const [employee, setEmployee] = useState({...employeeModel});
  const [projects, setProjects] = useState([]);

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
  }, [id] )

    const {firstName, lastName, position} = employee;
  return (
      <div style={{padding: '2rem', background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h3>{firstName} {lastName}</h3>
        <p>{position}</p>
        <h4>Current projects:</h4>
        <ul>
          {projects.map( p => <li>{p.name}</li>)}
        </ul>
      </div>
  );
}