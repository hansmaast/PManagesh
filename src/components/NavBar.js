import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Flex } from "./wrappers/Flex";
import { navBarColor } from "../style/colors";
import { largeScreen } from "../style/dimensions";
import { SearchInput } from "./inputs/SearchInput";
import { useSearchArray } from "../utils/hooks/useSearchArray";
import { useLocation } from "react-router-dom";
import { useProjectStore } from "../store/projectStore";
import { useEmployeeStore } from "../store/employeeStore";

export default () => {

  const [ searchTerm, setSearchTerm ] = useState( '' );

  let { pathname } = useLocation();

  if ( pathname.includes( '/projects' ) ) {
    const projects = useProjectStore( state => state.projects );
    const setFilteredProjects = useProjectStore( state => state.setFilteredProjects );
    useSearchArray( projects, 'name', searchTerm, setFilteredProjects );
  }

  if ( pathname.includes( '/employees' ) ) {
    const employees = useEmployeeStore( state => state.employees );
    const setFilteredEmployees = useEmployeeStore( state => state.setFilteredEmployees );
    useSearchArray( employees, 'firstName', searchTerm, setFilteredEmployees );
  }

  const navStyle = { width: '100%', maxWidth: largeScreen };

  return (
      <Flex zIndex={ 100 }
            position={ 'fixed' }
            justifyContent={ 'center' }
            backgroundColor={ navBarColor }
      >
        <Navbar className={ ' px-2' }
                style={ navStyle }
                collapseOnSelect
                expand="lg" bg={ navBarColor }
        >
          <SearchInput value={ searchTerm }
                       onChange={ e => setSearchTerm( e.target.value ) }
          />
          <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/projects">Projects</Nav.Link>
              <Nav.Link href="/employees">Employees</Nav.Link>
              <Nav.Link href="/costumers">Costumers</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Flex>
  );
};
