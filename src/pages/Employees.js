import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Col, Row, Container } from "react-bootstrap";
import { CreateEmployeeModal } from "../components/modals/CreateEmployeeModal";
import { getEmployees } from "../db/actions";
import LayoutStyle from "../components/LayoutStyle";
import EmployeeCard from "../components/Cards/EmployeeCard";

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
      <br></br>
      <h4 style={{ textAlign: "center" }}>Employees:</h4>
      <br></br>
      <LayoutStyle>
        {employees.map((employee) => {
          return <EmployeeCard employee={employee} />;
        })}
      </LayoutStyle>
      <br></br>

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
