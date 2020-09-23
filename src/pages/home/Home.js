import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Folder } from "react-feather";
import { getProjects } from "../../db/actions";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { useSearchArray } from "../../utils/hooks/useSearchArray";
import { CardLink } from "../../components/Cards/CardLink";
import ProjectsRow from "../../containers/ProjectsRow";

export default () => {
  const [ projects, setProjects ] = useState( [] );
  const [ filteredProjects, setFilteredProjects ] = useState( [] );
  const [ showModal, setShowModal ] = React.useState( { type: '', show: false } );
  const [ searchTerm, setSearchtTerm ] = useState( '' );

  const fetchProjects = async () => {
    const projectsFromDb = await getProjects();
    setProjects( [ ...projects, ...projectsFromDb ] );
    setFilteredProjects( [ ...projectsFromDb ] )
  };

  useSearchArray( 'name', searchTerm, projects, setFilteredProjects );

  useEffect( () => {
    fetchProjects();
  }, [] );


  return (
      <div>
        <Container className={ 'pt-5 px-5' }>
          <ProjectsRow />
        </Container>
      </div>
  );
};
