import React from "react";
import EmployeeList from "../components/EmployeeList";
import TestCard from "../components/TestCard";

export default () => {
  return (
    <div>
      <h2>Home</h2>
      <TestCard />

      <EmployeeList />
    </div>
  );
};
