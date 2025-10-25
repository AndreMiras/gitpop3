import { FunctionComponent } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const Navigation: FunctionComponent = () => (
  <Navbar bg="dark" variant="dark" expand="sm" className="mb-4">
    <Container>
      <Navbar.Brand as={Link} to="/">
        <FontAwesomeIcon icon={["fab", "github"] as IconProp} /> GitPop3
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">
            <FontAwesomeIcon icon="home" /> Home
          </Nav.Link>
          <Nav.Link href="https://github.com/AndreMiras/gitpop3">
            <FontAwesomeIcon icon={["fab", "github-alt"]} /> About
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default Navigation;
