import React from "react";
import { Container } from "react-bootstrap";
import { version } from "../../package.json";

const Footer = () => (
  <footer className="footer d-none d-md-block">
    <Container className="text-center">
      <span>Copyright &copy; Andre Miras 2020 - gitpop3 v{version}</span>
    </Container>
  </footer>
);

export default Footer;
