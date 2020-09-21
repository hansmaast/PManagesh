import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProjectDetails } from "../db/actions";

export default () => {
  const [ project, setProject ] = useState( null );

  let { id } = useParams();
  const intId = parseInt( id );


  useEffect( () => {
    // const project = getProject(intId);
    const init = async () => {
      let data = await getProjectDetails( intId );
      await setTimeout( () => setProject( data ), 500 );
    }
    init().catch( e => console.log(e));
  }, [ intId ] );

  if ( !project ) {
    return <p>Loading..</p>
  }

  console.log( 'project -> ', project );

  return (
      <div>
        <h4>Project: { project.details.name }</h4>
        <p>Custumer: { project.costumer.name }</p>
        <p>Employees: </p>
        <ul>
          { project.employees.map( e => <li key={e.id}>{ `${ e.firstName } ${ e.lastName }` }</li> ) }
        </ul>
        <h5>Description:</h5>
        <p>{ project.details.description }</p>
      </div>
  );
}