import React from "react";
import Employees from "../fakeData/Employees.json";
import { Table } from "react-bootstrap";

const EmployeeList = () => {
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Projects</th>
          </tr>
        </thead>
        {Employees.map((employee) => {
          return (
            <tbody>
              <tr>
                <td>{employee.id}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{employee.project}</td>
              </tr>
            </tbody>
          );
        })}
      </Table>
    </div>
  );
};

export default EmployeeList;
