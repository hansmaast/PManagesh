import React, { useState } from "react";
import { Container } from "react-bootstrap";
import ProjectsRow from "../../containers/ProjectsRow";
import EmployeesRow from "../../containers/EmployeesRow";
import { getProjects } from "../../db/actions";


export default () => {
  const [ projects, setProjects ] = useState( [] );
  const [ filteredProjects, setFilteredProjects ] = useState( [] );

  const fetchProjects = async () => {
    const projectsFromDb = await getProjects();
    setProjects( [ ...projects, ...projectsFromDb ] );
    setFilteredProjects( [ ...projectsFromDb ] )
  };

  return (
      <>
        <Container className={ ' ' }>
          <ProjectsRow/>
          <EmployeesRow/>
          <EmployeesRow/>
          <EmployeesRow/>
          <EmployeesRow/>
        </Container>
      </>
  );
};
