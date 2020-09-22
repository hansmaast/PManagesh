import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEmployeeById } from "../db/actions";
import { employeeModel } from "../db/models";

export default () => {

  const [employee, setEmployee] = useState({...employeeModel});

  let { id } = useParams();
  const intId = parseInt( id );

  const getData = async () => {

    const employee = await getEmployeeById(intId);
    setEmployee( {...employee} );
  }

  useEffect( () => {
    getData();
  }, [] )

  return (
      <div>
        <code>
          {JSON.stringify(employee, null, 2)}
        </code>

      </div>
  );
}