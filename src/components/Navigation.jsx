import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

const Navigation = () => (
  <Navbar bg="dark" variant="dark" expand="sm" className="mb-4">
    <Container>
      <Navbar.Brand href={process.env.PUBLIC_URL}>GitPop3</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="mr-auto">
          <Nav.Link href={process.env.PUBLIC_URL}>Home</Nav.Link>
          <Nav.Link href="https://github.com/AndreMiras/gitpop3">About</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default Navigation;
