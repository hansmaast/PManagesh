import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { getEmployees } from "../../db/actions";
import { useSearchArray } from "../../utils/hooks/useSearchArray";
import { ScrollRowArrows } from "../../components/wrappers/ScrollRowArrows";
import { SearchInput } from "../../components/inputs/SearchInput";
import { PlussButton } from "../../components/buttons/PlussButton";
import Row from "react-bootstrap/Row";
import { CreateEmployeeModal } from "../../components/modals/CreateEmployeeModal";
import { EmployeeDetails } from "../index";
import { Route, Switch,   useRouteMatch } from "react-router-dom";

export default () => {
  const [ employees, setEmployees ] = useState( [] );
  const [ filteredData, setFilteredData ] = useState( [] );
  const [ showModal, setShowModal ] = React.useState( false );
  const [ searchTerm, setSearchTerm ] = useState( '' );

  const fetchProjects = async () => {
    const employeesFromDb = await getEmployees();
    setEmployees( [ ...employees, ...employeesFromDb ] );
    setFilteredData( [ ...employeesFromDb ] )
  };
  let { path, url } = useRouteMatch();
  useSearchArray( 'firstName', searchTerm, employees, setFilteredData );

  useEffect( () => {
    fetchProjects();
  }, [] );
  return (
      <Container className={ 'mt-5' }>
        <div>
          <h1 className={ 'm-0' }> Employees </h1>
          <Row className={ 'px-3' }>
            <SearchInput
                value={ searchTerm }
                onChange={ e => setSearchTerm( e.target.value ) }
            />
            <PlussButton onClick={ () => setShowModal( true ) }/>
          </Row>
          <ScrollRowArrows data={ filteredData }
          />
          <CreateEmployeeModal show={ showModal } onHide={ () => {
            setShowModal( false );
            fetchProjects();
          } }/>
        </div>
        <Switch>
          <Route path={`${path}/:id`} >
            <EmployeeDetails />
          </Route>
        </Switch>
      </Container>
  );
};
