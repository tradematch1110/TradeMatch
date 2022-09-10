import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import MainLogo from "../svg/MainLogo";

function Footer() {
  return (
    <Navbar fixed="bottom" expand="lg" variant="dark" bg="dark">
      <Container  style={{ justifyContent: "center" }}>
        <MainLogo height={30} width={30} />
        <Navbar.Brand>Tradematch &copy; since 2022</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Footer;
