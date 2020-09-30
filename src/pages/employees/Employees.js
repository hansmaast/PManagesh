import React, { useEffect } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Row from "react-bootstrap/Row";
import { CreateEmployeeModal } from "../../components/modals/CreateEmployeeModal";
import { EmployeeDetails } from "../index";
import { ScrollRowArrows } from "../../components/wrappers/ScrollRowArrows";
import { PlusButton } from "../../components/buttons/PlusButton";
import { useEmployeeStore } from "../../store/employeeStore";
import MainWrapper from "../../components/wrappers/MainWrapper";
import { useScreenProperties } from "../../store/screenProperties";

export default () => {

  const fetchEmployees = useEmployeeStore( state => state.fetchEmployees );
  const filteredEmployees = useEmployeeStore( state => state.filteredEmployees );
  const isSmallScreen = useScreenProperties( state => state.isSmallScreen )

  const [ showModal, setShowModal ] = React.useState( false );
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
        </div>


        { !isSmallScreen &&
        <div>
          <Switch>
            <Route path={ `${ path }/:id` }>
              <EmployeeDetails/>
            </Route>
          </Switch>
        </div>
        }

        <CreateEmployeeModal
            show={ showModal }
            onHide={ () => {
              setShowModal( false );
              fetchEmployees();
            } }
        />
      </MainWrapper>
  );
};