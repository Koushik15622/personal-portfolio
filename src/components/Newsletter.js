import { Col, Row } from "react-bootstrap";
import { ArrowRightCircle } from 'react-bootstrap-icons';

export const Newsletter = () => {

  const handleSubmit = async (e) => {
    e.preventDefault();
        window.open("https://drive.google.com/file/d/1X4bcoPrly2-TqMiiecje8ZejN4QLaRVI/view?usp=sharing", "_blank");
  };
  
  return (
    <Col lg={12}>
      <div className="newsletter-bx wow slideInUp">
        <Row>
          <Col lg={12} md={10} xl={10}>
            <h3>Interested in knowing more about my skills and experience?<br></br>You can download my resume here <ArrowRightCircle size={25} /></h3>
          </Col>
          <Col lg={12} md={2} xl={2}>
            <form onSubmit={handleSubmit}>
              <button id="btn" type="submit">Download</button>
            </form>
          </Col>
        </Row>
      </div>
    </Col>
  )
}