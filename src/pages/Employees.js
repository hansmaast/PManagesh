import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { CreateEmployeeModal } from "../components/modals/CreateEmployeeModal";
import { getEmployees } from "../db/actions";

export default () => {
  const [employees, setEmployees] = useState([{}]);
  const [showModal, setShowModal] = React.useState(false);

  const getData = async () => {
    const employees = await getEmployees();
    setEmployees([...employees]);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h4>Employees:</h4>
      <ul>
        {employees.map((employee) => {
          return (
            <Link to={`employees/${employee.id}`} key={employee.id}>
              <li>{employee.firstName}</li>
            </Link>
          );
        })}
      </ul>

      <Button variant="primary" onClick={() => setShowModal(true)}>
        Add new employee
      </Button>

      <CreateEmployeeModal
        currentEmployees={employees}
        show={showModal}
        onHide={() => {
          getData();
          setShowModal(false);
        }}
      />
    </div>
  );
};
