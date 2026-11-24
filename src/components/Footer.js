import { Container, Row, Col } from "react-bootstrap";
import logo from "../assets/img/inverted_image.png";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon2 from "../assets/img/nav-icon2.svg";
import navIcon3 from "../assets/img/nav-icon3.svg";

export const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center">
          <Col size={12} sm={6}>
            <img src={logo} alt="Logo" />
          </Col>
          <Col size={12} sm={6} className="text-center text-sm-end">
            <div className="social-icon">
              <a href="https://www.linkedin.com/in/koushik-pln-0b84911a4/"><img src={navIcon1} alt="LinkedIn" /></a>
              <a href="https://www.facebook.com/koushik.pln.1"><img src={navIcon2} alt="Facebook" /></a>
              <a href="https://github.com/Koushik15622/"><img src={navIcon3} alt="GitHub" /></a>
            </div>
            <p>Copyright 2022. All Rights Reserved</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
