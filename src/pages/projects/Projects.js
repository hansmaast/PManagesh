import React, { useEffect, useState } from "react";
import { getProjects } from "../../db/actions";
import { Button } from "react-bootstrap";
import LayoutStyle from "../../components/LayoutStyle";
import ProjectCard from "../../components/Cards/ProjectCard";
import { CreateProjectModal } from "../../components/modals/CreateProjectModal";

export default () => {
  const [ projects, setProjects ] = useState( [] );
  const [ showModal, setShowModal ] = React.useState( false );

  useEffect( () => {
    const fetchProjects = async () => {
      const projectsFromDb = await getProjects();
      setProjects( [ ...projects, ...projectsFromDb ] );
    };
    fetchProjects();
  }, [] );

  return (
      <div>
        <h4>Projects:</h4>
        <LayoutStyle>
          { projects.map( ( project ) => {
            return <ProjectCard project={ project }/>;
          } ) }
        </LayoutStyle>
        <Button variant="primary" onClick={ () => setShowModal( true ) }>
          Add new project
        </Button>

        <CreateProjectModal show={ showModal } onHide={ () => setShowModal( false ) }/>
      </div>
  );
};
