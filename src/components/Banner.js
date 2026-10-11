import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/comp.gif";
import me from "../assets/img/me.jpeg"
import { ArrowDownCircle, ArrowRightCircle, Download } from 'react-bootstrap-icons';
import { HashLink } from 'react-router-hash-link';
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import { Particles } from "./Particles";

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = ["Software Developer", "Security Engineer", "Explorer :)","Penetration Tester", "Web Designer","Explorer :)"];
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
      <Particles />
      <Container>
        <Row className="aligh-items-center">
          <Col xs={12} md={7} xl={7}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <span className="tagline">Welcome Explorers!</span>
                  <h1>{`I'm Koushik PLN`} </h1>
                  <h2>{`You've explored the presence of another `}<br></br><span className="txt-rotate" dataPeriod={period} data-rotate={toRotate}><span className="wrap">{text}</span><span className="cursor" aria-hidden="true"></span></span></h2>
                  <p>I love to explore various tools and technologies in the fields of software security and development. I strongly believe that Learning is a never ending process</p>
                  <div className="hero-cta">
                    <HashLink to="#connect" className="hero-cta-primary">
                      <span>Let’s Connect</span>
                      <ArrowRightCircle size={18} />
                    </HashLink>
                    <a
                      className="hero-cta-secondary"
                      href="https://drive.google.com/file/d/1X4bcoPrly2-TqMiiecje8ZejN4QLaRVI/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Download Resume</span>
                      <Download size={18} />
                    </a>
                  </div>
                </div>}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={5} xl={5}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "hero-media animate__animated animate__zoomIn" : "hero-media"}>
                  <div className="hero-media-card">
                    <img src={headerImg} alt="Coding illustration" />
                  </div>
                  <div className="hero-media-card hero-media-photo">
                    <img src={me} alt="Koushik PLN" />
                  </div>
                </div>
              }
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <a className="scroll-cue" href="#skills" aria-label="Scroll to skills">
        <ArrowDownCircle size={32} />
      </a>
    </section>
  )
}
