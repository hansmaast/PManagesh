import React, { useEffect, useRef, useState } from "react";
import { Folder, PlusCircle } from "react-feather";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { getProjects } from "../db/actions";
import { useSearchArray } from "../utils/hooks/useSearchArray";
import { CardLink } from "../components/Cards/CardLink";
import { CreateProjectModal } from "../components/modals/CreateProjectModal";
import { FlexBetweenHorizontal } from "../wrappers/FlexBetweenHorizontal";
import { ScrollRowArrows } from "../wrappers/ScrollRowArrows";
import { SearchInput } from "../components/inputs/SearchInput";

const scrollRight = ( element, row ) => {
  console.log( 'scrolling row -> ', row );
  console.log( 'element -> ', element );
  const width = element.current.clientWidth;
  const margin = element.current.style.marginRight;
  const marginInt = parseInt(margin.slice(0, (margin.length - 2)));
  console.log('margin ->', marginInt);
  const totalWidth = width + marginInt;

  row.current.scrollLeft += totalWidth * 2;

  console.log( 'right clicked!' )
}

const scrollLeft = ( element, row ) => {
  console.log( 'scrolling row -> ', row );
  console.log( 'element -> ', element );
  const width = element.current.clientWidth;
  const margin = element.current.style.marginRight;
  const marginInt = parseInt(margin.slice(0, (margin.length - 2)));
  console.log('margin ->', marginInt);
  row.current.scrollLeft -= (width + marginInt) * 2;

  console.log( 'right clicked!' )
}

export default () => {
  const [ projects, setProjects ] = useState( [] );
  const [ filteredProjects, setFilteredProjects ] = useState( [] );
  const [ showModal, setShowModal ] = React.useState( false );
  const [ searchTerm, setSearchTerm ] = useState( '' );

  const fetchProjects = async () => {
    const projectsFromDb = await getProjects();
    setProjects( [ ...projects, ...projectsFromDb ] );
    setFilteredProjects( [ ...projectsFromDb ] )
  };

  const myRef = useRef( null );
  const scrollRow = useRef(null)

  useSearchArray( 'name', searchTerm, projects, setFilteredProjects );

  useEffect( () => {
    fetchProjects();
  }, [] );


  return (
      <Container style={ { position: 'relative' } }>
        <h1 className={ 'mb-3 ml-3' }> Projects </h1>
        <FlexBetweenHorizontal>
          <SearchInput
              value={ searchTerm }
              onChange={ e => setSearchTerm( e.target.value ) }
          />
          <Button onClick={ () => setShowModal( true ) } style={ { padding: 0, borderRadius: 100 } }>
            <PlusCircle size={ 35 }/>
          </Button>
        </FlexBetweenHorizontal>
        <ScrollRowArrows onRightClick={ () => scrollRight( myRef, scrollRow ) } onLeftClick={ () => scrollLeft( myRef, scrollRow ) } refProp={scrollRow}>
          { filteredProjects.length === 0 && <p>Not match found..</p> }
          {
            filteredProjects.map( p => (
                <CardLink
                    to={ `/projects/${ p.id }` }
                    title={ p.name }
                    text={ p.description.slice( 0, 20 ) + '...' }
                    icon={ <Folder/> }
                />
            ) )
          }

          <CardLink
              refProp={myRef}
              icon={ <Folder/> }
          />
        </ScrollRowArrows>

        <CreateProjectModal show={ showModal } onHide={ () => {
          setShowModal( false );
          fetchProjects();
        } }/>
      </Container>
  );
};
