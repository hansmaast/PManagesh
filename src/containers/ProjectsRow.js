import React, { useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import { getProjects } from "../db/actions";
import { useSearchArray } from "../utils/hooks/useSearchArray";
import { CreateProjectModal } from "../components/modals/CreateProjectModal";
import { ScrollRowArrows } from "../components/wrappers/ScrollRowArrows";
import { SearchInput } from "../components/inputs/SearchInput";
import { scrollElementWidth } from "../utils/scrollElementWidth";
import { PlussButton } from "../components/buttons/PlussButton";
import Row from "react-bootstrap/Row";

export default (props) => {
  const [ projects, setProjects ] = useState( [] );
  const [ filteredProjects, setFilteredProjects ] = useState( [] );
  const [ showModal, setShowModal ] = React.useState( false );
  const [ searchTerm, setSearchTerm ] = useState( '' );

  const fetchProjects = async () => {
    const projectsFromDb = await getProjects();
    setProjects( [ ...projects, ...projectsFromDb ] );
    setFilteredProjects( [ ...projectsFromDb ] )
  };

  const cardRef = useRef( null );
  const rowRef = useRef( null )

  useSearchArray( 'name', searchTerm, projects, setFilteredProjects );

  useEffect( () => {
    fetchProjects();
  }, [] );

  return (
      <Container style={{marginTop: '12rem'}} fluid>
        <h1 className={ 'm-0' }> Projects </h1>
        <Row className={ 'px-3' }>
          <SearchInput
              value={ searchTerm }
              onChange={ e => setSearchTerm( e.target.value ) }
          />
          <PlussButton onClick={ () => setShowModal( true ) }/>
        </Row>
        <ScrollRowArrows
            onRightClick={ () => scrollElementWidth( true, 3, cardRef, rowRef ) }
            onLeftClick={ () => scrollElementWidth( false, 3, cardRef, rowRef ) }
            rowRef={ rowRef }
            cardRef={ cardRef }
            data={ filteredProjects }
        />
        <CreateProjectModal show={ showModal } onHide={ () => {
          setShowModal( false );
          fetchProjects();
        } }/>
      </Container>
  );
};
