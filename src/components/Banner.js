import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/comp.gif";
import me from "../assets/img/me.jpeg"
import { ArrowDownCircle } from 'react-bootstrap-icons';
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = ["Software Developer", "Security Engineer", "DevOps Engineer", "Penetration Tester", "Web Designer", "Python Programmer"];
  const period = 1000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text])

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(300);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="aligh-items-center">
          <Col xs={13} md={7} xl={7}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <span className="tagline">Welcome to my Portfolio</span>
                  <h1>{`Hi! I'm Koushik PLN`} </h1>
                  <h2>{`A Resourceful `}<span className="txt-rotate" dataPeriod={period} data-rotate={toRotate}><span className="wrap">{text}</span></span></h2>
                  <br></br>
                  <p>I love to explore various tools and technologies in the fields of software security and development. I strongly believe that Learning is a never ending process</p>
                  <button onClick={() => console.log('connect')}>Keep Exploring <ArrowDownCircle size={25} /></button>
                </div>}
            </TrackVisibility>
          </Col>
          <Col xs={13} md={3} xl={3}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "bounce animate__animated animate__zoomIn" : ""}>
                  <img src={headerImg} alt="Header Img" />

                </div>
              }
            </TrackVisibility>
          </Col>
          <Col xs={13} md={2} xl={2}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                  <br></br>
                  <br></br>
                  <br></br>
                  <img src={me} alt="Header Img" />
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
