import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { CreateProjectModal } from "../../components/modals/CreateProjectModal";
import { PlussButton } from "../../components/buttons/PlussButton";
import ProjectCard from "../../components/cards/ProjectCard";
import { largeScreen } from "../../style/dimensions";
import { Flex } from "../../components/wrappers/Flex";
import { StatusFilter } from "../../components/inputs/StatusFilter";
import { useStatusFilter } from "../../utils/hooks/useStatusFilter";
import { useProjectStore } from "../../store/projectStore";
import { Search } from "react-feather";

export default () => {

  const fetchProjects = useProjectStore( state => state.fetchProjects );
  const projects = useProjectStore( state => state.projects );
  const filteredProjects = useProjectStore( state => state.filteredProjects );
  const setFilteredProjects = useProjectStore( state => state.setFilteredProjects );
  const [ showModal, setShowModal ] = useState( false );
  const [ statusFilter, setStatusFilter ] = useState( 'all' );

  useStatusFilter( projects, statusFilter, setFilteredProjects );

  useEffect( () => {
    fetchProjects();
  }, [ fetchProjects ] );

  return (
      <Container className={ 'px-5 py-5' } style={ { maxWidth: largeScreen, paddingTop: 40 } }>
        <h1 className={ 'm-2' }> Projects </h1>

        <Flex flexDirection={ 'row' } justifyContent={ 'space-between' }
              alignItems={ 'center' }>

          <StatusFilter onChange={ e => setStatusFilter( e.target.value ) }/>
          <PlussButton onClick={ () => setShowModal( true ) }/>
        </Flex>

        <Flex flexWrap={ 'wrap' } justifyContent={ 'center' }>

          { !filteredProjects &&
          <h3 className={ 'm-auto' }>Click the + to create a project!</h3>
          }
          { filteredProjects && filteredProjects.length === 0 &&
          <h4 className={ 'm-auto' }>No match found..<Search/></h4>
          }
          {
            filteredProjects.map( p => {
              return (
                  <ProjectCard key={ p.id } project={ p }/>
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
