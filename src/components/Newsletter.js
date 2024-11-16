import { Col, Row } from "react-bootstrap";
import { ArrowRightCircle } from 'react-bootstrap-icons';

export const Newsletter = () => {

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Fetch the file from the server
      let response = await fetch("https://koushik-pln.vercel.app/", {
        method: "GET",
      });
  
      // Check if the response is OK
      if (response.ok) {
        // Convert the response to a Blob
        const blob = await response.blob();
        // Create a download link
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = "Koushik-P.pdf"; // The file name for the download
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url); // Clean up the URL object
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
