import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Flex } from "./wrappers/Flex";
import { navBarColor } from "../style/colors";
import { largeScreen } from "../style/dimensions";

export default () => {

  return (
      <Flex justifyContent={ 'center' } backgroundColor={ navBarColor }>
        <Navbar className={ 'mx-auto px-5 py-4' } style={ { width: '100%', maxWidth: largeScreen } } collapseOnSelect
                expand="lg" bg={ navBarColor }>
          <Navbar.Brand href="/">Pingo Manager</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/projects">Projects</Nav.Link>
              <Nav.Link href="/employees">Employees</Nav.Link>
              <Nav.Link href="/costumers">Costumers</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="/team">Pingo Team</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Flex>
  );
};
