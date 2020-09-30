import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Flex } from "./wrappers/Flex";
import { navBarColor } from "../style/colors";
import { largeScreen } from "../style/dimensions";
import { SearchInput } from "./inputs/SearchInput";
import { useSearchArray } from "../utils/hooks/useSearchArray";
import { Link } from "react-router-dom";
import { useProjectStore } from "../store/projectStore";
import { useEmployeeStore } from "../store/employeeStore";
import { useCustomerStore } from "../store/customerStore";

export default () => {

  const [ searchTerm, setSearchTerm ] = useState( '' );

  const projects = useProjectStore( state => state.projects );
  const setFilteredProjects = useProjectStore( state => state.setFilteredProjects );
  useSearchArray( projects, 'name', searchTerm, setFilteredProjects );

  const employees = useEmployeeStore( state => state.employees );
  const setFilteredEmployees = useEmployeeStore( state => state.setFilteredEmployees );
  useSearchArray( employees, 'firstName', searchTerm, setFilteredEmployees );

  const customers = useCustomerStore( state => state.customers );
  const setFilteredCustomers = useCustomerStore( state => state.setFilteredCustomers );
  useSearchArray( customers, 'name', searchTerm, setFilteredCustomers );


  const navStyle = { width: '100%', maxWidth: largeScreen };

  return (
      <Flex zIndex={ 100 }
            position={ 'fixed' }
            justifyContent={ 'center' }
            backgroundColor={ navBarColor }
      >
        <Navbar className={ ' px-4' }
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

                <Link className={'ml-4'} to="/projects">Projects</Link>


                <Link className={'ml-4'} to={ '/employees' }>Employees</Link>


                <Link className={'ml-4'} to={ '/customers' }>Customers</Link>

            </Nav>
            <Nav className={ 'ml-auto' }>
                <Link className={'mr-4'} to={ '/' }>Home</Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Flex>
  );
};
