import { FunctionComponent } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navigation: FunctionComponent = () => (
  <Navbar bg="dark" variant="dark" expand="sm" className="mb-4">
    <Container>
      <Navbar.Brand href={import.meta.env.BASE_URL}>
        <FontAwesomeIcon icon="code-branch" /> GitPop3
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="mr-auto">
          <Nav.Link href={import.meta.env.BASE_URL}>
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
