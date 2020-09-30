import React, { useEffect, useState } from "react";
import { CreateProjectModal } from "../../components/modals/CreateProjectModal";
import { PlusButton } from "../../components/buttons/PlusButton";
import ProjectCard from "../../components/cards/ProjectCard";
import { Flex } from "../../components/wrappers/Flex";
import { StatusFilter } from "../../components/inputs/StatusFilter";
import { useStatusFilter } from "../../utils/hooks/useStatusFilter";
import { useProjectStore } from "../../store/projectStore";
import ProjectDetailsModal from "../../components/modals/ProjectDetailsModal";
import MainWrapper from "../../components/wrappers/MainWrapper";
import NoMatchOrEmpty from "../../components/alerts/NoMatchOrEmpty";

export default () => {

  const fetchProjects = useProjectStore( state => state.fetchProjects );
  const projects = useProjectStore( state => state.projects );
  const filteredProjects = useProjectStore( state => state.filteredProjects );
  const setFilteredProjects = useProjectStore( state => state.setFilteredProjects );
  const projectDetailId = useProjectStore( state => state.projectDetailId );
  const setProjectDetailId = useProjectStore( state => state.setProjectDetailId )
  const [ showModal, setShowModal ] = useState( false );
  const [ showDetails, setShowDetails ] = useState( false );
  const [ statusFilter, setStatusFilter ] = useState( 'all' );

  useStatusFilter( projects, statusFilter, setFilteredProjects );

  useEffect( () => {
    fetchProjects();
  }, [ fetchProjects ] );

  function handleDetailClick( id ) {
    setProjectDetailId( id );
    setShowDetails( true );
  }

  return (
      <MainWrapper>

        <h1> Projects </h1>
        <Flex flexDirection={ 'row' } justifyContent={ 'space-between' }
              alignItems={ 'center' }>

          <StatusFilter className={ 'm-2' } onChange={ e => setStatusFilter( e.target.value ) }/>
          <PlusButton onClick={ () => setShowModal( true ) }/>
        </Flex>

        <Flex flexWrap={ 'wrap' } justifyContent={ 'center' }>

          {
            filteredProjects.length === 0 &&
            <NoMatchOrEmpty/>
          }
          {
            filteredProjects.map( p => {
              return (
                  <div key={ p.id } onClick={ () => handleDetailClick( p.id ) }>
                    <ProjectCard project={ p }/>
                  </div>
              );
            } )
          }
        </Flex>

        <ProjectDetailsModal projectId={ projectDetailId } show={ showDetails }
                             onHide={ () => setShowDetails( false ) }/>
        <CreateProjectModal show={ showModal } onHide={ () => {
          setShowModal( false );
          fetchProjects();
        } }/>
      </MainWrapper>
  );
};
