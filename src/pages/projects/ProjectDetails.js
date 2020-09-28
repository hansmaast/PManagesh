import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import shallow from "zustand/shallow";
import { useProjectStore } from "../../store/projectStore";

export default () => {
  const { projectDetails, fetchDetails } = useProjectStore( state => ( {
    projectDetails: state.projectDetails,
    fetchDetails: state.fetchDetails
  } ), shallow );

  let { id } = useParams();
  const idAsInt = parseInt( id );


  useEffect( () => {
    fetchDetails(idAsInt)
  }, [] );

  if ( !projectDetails ) {
    return <p>Loading..</p>
  }

  console.log( 'details -> ', projectDetails );

  return (
      <div>
        <h4>Project: { projectDetails.name }</h4>
        {/*<p>Customer: { projectDetails.customer}</p>*/}
        <p>Employees: </p>
        <ul>
          {/*{ projectDetails.employees.map( e => <li key={ e.id }>{ `${ e.firstName } ${ e.lastName }` }</li> ) }*/}
        </ul>
        <h5>Description:</h5>
        <p>{ projectDetails.description }</p>
      </div>
  );
}