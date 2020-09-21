import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addCostumerToDb, getCostumers } from "../db/actions";
import { containsDuplicate } from "../utils/containsDuplicate";

export default () => {

  const [ costumers, setCostumers ] = useState( [] );
  const [ costumer, setCostumer ] = useState( { name: '' } );

  const fetchProjects = async () => {
    const fromDb = await getCostumers();
    setCostumers( [ ...costumers, ...fromDb ] );
  };

  function handleSubmit() {
    return async e => {
      e.preventDefault();
      if ( containsDuplicate(costumers, 'name', costumer.name) ) {
        return alert( 'Costumer exists!' );
      }
      await addCostumerToDb( costumer );
      setCostumers( [ ...costumers, costumer ] );
      setCostumer( { name: '' } );
    };
  }

  useEffect( () => {
    fetchProjects();
  }, [] );

  return (
      <div>
        <h4>Costumers:</h4>
        <ul>
          {
            costumers.map( c => {
              return (
                  <Link to={ `costumers/${ c.id }` } key={ c.id }>
                    <li>{ c.name }</li>
                  </Link>
              );
            } )
          }
        </ul>
        <form onSubmit={ handleSubmit() }>
          <h3>Add new costumer</h3>
          <label htmlFor={ 'costumerName' }> Customer name:
            <input
                value={ costumer.name }
                required
                onChange={
                  e => setCostumer( { ...costumer, name: e.target.value } )
                }
            />
          </label>
          <input type={ 'submit' } value={ 'Add new costumer' }/>
        </form>
      </div>
  );
}