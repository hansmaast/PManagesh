import React, { useState } from "react";
import { Container } from "react-bootstrap";
import ProjectsRow from "../projects/Projects";
import EmployeesRow from "../employees/Employees";
import { getProjects } from "../../db/actions";
import { Flex } from "../../components/wrappers/Flex";
import Employees from "../employees/Employees";


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
        <Container className={ 'mt-5' }>
          <ProjectsRow/>
          <Flex justifyContent={"center"} alignItems={'center'}>
          <Employees/>
          </Flex>
        </Container>
      </>
  );
};
