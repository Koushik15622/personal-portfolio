import { Container, Row, Col } from "react-bootstrap";
import { Newsletter } from "./Newsletter";
import logo from "../assets/img/inverted_image.png";
import { Linkedin, Facebook, Github } from 'react-bootstrap-icons';

export const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center">
          <Newsletter />
          <Col size={12} sm={6}>
            <img src={logo} alt="Logo" />
          </Col>
          <Col size={12} sm={6} className="text-center text-sm-end">
            <div className="social-icon">
              <a href="https://www.linkedin.com/in/koushik-pln-0b84911a4/" aria-label="LinkedIn"><Linkedin size={20} /></a>
              <a href="https://www.facebook.com/koushik.pln.1" aria-label="Facebook"><Facebook size={20} /></a>
              <a href="https://github.com/Koushik15622/" aria-label="GitHub"><Github size={20} /></a>
            </div>
            <p>Copyright 2022. All Rights Reserved</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
