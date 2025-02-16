import { Col, Row } from "react-bootstrap";
import { ArrowRightCircle } from 'react-bootstrap-icons';

export const Newsletter = () => {

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let response = await fetch("https://personal-portfolio-7dt4.vercel.app/resume", {
        method: "GET",
      });
  
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = "Koushik-P.pdf"; 
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url); 
        console.log("File downloaded successfully");
      } else {
        console.log("Failed to download the file");
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
