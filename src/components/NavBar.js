import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

export default () => {
  // just an example, needs customising
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Brand href="/">Pingo Manager</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
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
  );
};
