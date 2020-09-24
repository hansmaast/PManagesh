import React, { useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import { getEmployees } from "../db/actions";
import { useSearchArray } from "../utils/hooks/useSearchArray";
import { ScrollRowArrows } from "../components/wrappers/ScrollRowArrows";
import { SearchInput } from "../components/inputs/SearchInput";
import { scrollElementWidth } from "../utils/scrollElementWidth";
import { PlussButton } from "../components/buttons/PlussButton";
import Row from "react-bootstrap/Row";
import { CreateEmployeeModal } from "../components/modals/CreateEmployeeModal";

export default () => {
  const [ data, setData ] = useState( [] );
  const [ filteredData, setFilteredData ] = useState( [] );
  const [ showModal, setShowModal ] = React.useState( false );
  const [ searchTerm, setSearchTerm ] = useState( '' );

  const fetchProjects = async () => {
    const projectsFromDb = await getEmployees();
    setData( [ ...data, ...projectsFromDb ] );
    setFilteredData( [ ...projectsFromDb ] )
  };

  const cardRef = useRef( null );
  const rowRef = useRef( null )

  useSearchArray( 'firstName', searchTerm, data, setFilteredData );

  useEffect( () => {
    fetchProjects();
  }, [] );

  return (
      <Container style={ { marginTop: '12rem' } } fluid>
        <h1 className={ 'm-0' }> Employees </h1>
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
            data={ filteredData }
        />
        <CreateEmployeeModal show={ showModal } onHide={ () => {
          setShowModal( false );
          fetchProjects();
        } }/>
      </Container>
  );
};
