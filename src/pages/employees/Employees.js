import React, { useEffect } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { CreateEmployeeModal } from "../../components/modals/CreateEmployeeModal";
import { EmployeeDetails } from "../index";
import { ScrollRowArrows } from "../../components/wrappers/ScrollRowArrows";
import { PlussButton } from "../../components/buttons/PlussButton";
import { useSearchArray } from "../../utils/hooks/useSearchArray";
import { useEmployeeStore } from "../../store/employeeStore";

export default () => {

  const fetchEmployees = useEmployeeStore( state => state.fetchEmployees );
  const employees = useEmployeeStore( state => state.employees);
  const filteredEmployees = useEmployeeStore( state => state.filteredEmployees );

  const [ showModal, setShowModal ] = React.useState( false );
  let { path } = useRouteMatch();

  useEffect( () => {
    fetchEmployees();
  }, [ fetchEmployees ] );

  return (
      <Container className={ 'mt-5' }>

        <div>
          <h1 className={ 'm-0' }> Employees </h1>
          <Row className={ 'px-3' }>
            <PlussButton onClick={ () => setShowModal( true ) }/>
          </Row>
          <ScrollRowArrows data={ filteredEmployees }/>
          <CreateEmployeeModal
              show={ showModal }
              onHide={ () => {
                setShowModal( false );
                fetchEmployees();
              } }
          />
        </div>

        <div>
        <Switch>
          <Route path={ `${ path }/:id` }>
            <EmployeeDetails/>
          </Route>
        </Switch>
        </div>
      </Container>
  );
};

// TODO: Add assign project to employee functionality