import React, { useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import { getProjects } from "../../db/actions";
import { useSearchArray } from "../../utils/hooks/useSearchArray";
import { CreateProjectModal } from "../../components/modals/CreateProjectModal";
import { SearchInput } from "../../components/inputs/SearchInput";
import { PlussButton } from "../../components/buttons/PlussButton";
import Row from "react-bootstrap/Row";
import ProjectCard from "../../components/cards/ProjectCard";
import { largeScreen, mediumScreen } from "../../style/dimensions";
import { Flex } from "../../components/wrappers/Flex";
import { StatusFilter } from "../../components/inputs/StatusFilter";

export default ( props ) => {
  const [ projects, setProjects ] = useState( [] );
  const [ filteredProjects, setFilteredProjects ] = useState( [] );
  const [ showModal, setShowModal ] = React.useState( false );
  const [ searchTerm, setSearchTerm ] = useState( '' );

  const fetchProjects = async () => {
    const projectsFromDb = await getProjects();
    setProjects( [ ...projects, ...projectsFromDb ] );
    setFilteredProjects( [ ...projectsFromDb ] )
  };

  const handleStatusFilter = ( status ) => {
    status = status.toLowerCase();

    if ( status === 'all' ) {
      return setFilteredProjects( [ ...projects ] );
    }

    const filtered = projects.filter( p => p.status.toLowerCase() === status );
    setFilteredProjects( [ ...filtered ] );
  };

  useSearchArray( 'name', searchTerm, projects, setFilteredProjects );

  useEffect( () => {
    fetchProjects();
  }, [] );

  return (
      <Container className={'px-5'} style={ { maxWidth: largeScreen, paddingTop: 40 } }>
        <h1 className={ 'm-0' }> Projects </h1>

        <Flex style={{border: '1px solid'}} flexDirection={ 'row' } justifyContent={ 'space-between' } alignItems={ 'center' }>
          <SearchInput
              value={ searchTerm }
              onChange={ e => setSearchTerm( e.target.value ) }
          />
          <StatusFilter onChange={ e => handleStatusFilter( e.target.value ) }/>
          <PlussButton onClick={ () => setShowModal( true ) }/>
        </Flex>

        <Flex flexWrap={'wrap'} justifyContent={'center'}>
          {
            filteredProjects.map( p => {
              return (
                  <ProjectCard project={ p }/>
              );
            } )
          }
        </Flex>

        <CreateProjectModal show={ showModal } onHide={ () => {
          setShowModal( false );
          fetchProjects();
        } }/>
      </Container>
  );
};
