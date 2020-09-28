import React, { useEffect } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { CreateEmployeeModal } from "../../components/modals/CreateEmployeeModal";
import { EmployeeDetails } from "../index";
import { ScrollRowArrows } from "../../components/wrappers/ScrollRowArrows";
import { PlusButton } from "../../components/buttons/PlusButton";
import { useSearchArray } from "../../utils/hooks/useSearchArray";
import { useEmployeeStore } from "../../store/employeeStore";
import MainWrapper from "../../components/wrappers/MainWrapper";

export default () => {

  const fetchEmployees = useEmployeeStore( state => state.fetchEmployees );
  const filteredEmployees = useEmployeeStore( state => state.filteredEmployees );

  const [ showModal, setShowModal ] = React.useState( true );
  let { path } = useRouteMatch();

  useEffect( () => {
    fetchEmployees();
  }, [ fetchEmployees ] );

  return (
      <MainWrapper>

        <div>
          <h1> Employees </h1>
          <Row className={ 'px-3' }>
            <PlusButton onClick={ () => setShowModal( true ) }/>
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
      </MainWrapper>
  );
};

// TODO: Add assign project to employee functionality