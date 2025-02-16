import React from 'react';
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import comp1 from "../assets/img/comp1.png";
import comp2 from "../assets/img/comp2.png";
import comp3 from "../assets/img/comp3.png";
import comp4 from "../assets/img/comp4.png";
import edu2 from "../assets/img/edu2.png";
import iot from "../assets/img/iot.png";
import python from "../assets/img/python.png";
import mern from "../assets/img/mern.png";
import java from "../assets/img/java.png";
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Background = () => {

  const companies = [
    {
      title: "Graduate Teaching Assistant",
      description: "04/2024 - Present",
      imgUrl: comp4,
    },
    {
      title: "Software Developer",
      description: "07/2023 - 11/2023",
      imgUrl: comp3,
    },
    {
      title: "Software Developer",
      description: "06/2022 - 06/2023",
      imgUrl: comp2,
    },
    {
      title: "Associate Software Engineer",
      description: "09/2021 - 06/2022",
      imgUrl: comp1,
    }
  ];

  const education = [
    {
      title: "Master's in Cybersecurity",
      description: "Graduated with a CGPA of 3.9/4.0",
      imgUrl: comp4,
    },
    {
      title: "Bachelor's in Computer Science & Engineering",
      description: "Graduated with a CGPA of 3.8/4.0",
      imgUrl: edu2,
    }
  ];

  const projects = [
    {
      title: "Research Initiative",
      description: "Blockchain security system in IoT devices",
      imgUrl: iot,
    },
    {
      title: "Ongoing Research Project",
      description: "RAG model to analyze of CISO Interviews",
      imgUrl: python,
    },
    {
      title: "Individual Project",
      description: "Ecommerce Platform with Multi-User Support",
      imgUrl: mern,
    },
    {
      title: "Freelance Development Project",
      description: "AUTO-MCP IDE for IC-processor Programming",
      imgUrl: java,
    }
  ];

  const navLinkStyle = {
    width: '100%',
    textAlign: 'center'
  };

  return (
    <section className="project" id="background">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Professional Background</h2>
                  <br></br>
                  <br></br>
                  <Tab.Container id="projects-tabs" defaultActiveKey="first">
                    <Nav variant="pills" style={navLinkStyle} className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                      <Nav.Item>
                        <Nav.Link eventKey="first">Work <br></br>Experience</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">Academic <br></br>Journey</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="third">Projects<br></br>& Research </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                      <Tab.Pane eventKey="first">
                        <Row>
                          {
                            companies.map((company, index) => {
                              return (
                                <ProjectCard
                                  key={index}
                                  {...company}
                                />
                              )
                            })
                          }
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <Row>
                          {
                            education.map((edu, index) => {
                              return (
                                <ProjectCard
                                  key={index}
                                  {...edu}
                                />
                              )
                            })
                          }
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <Row>
                          {
                            projects.map((project, index) => {
                              return (
                                <ProjectCard
                                  key={index}
                                  {...project}
                                />
                              )
                            })
                          }
                        </Row>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2}></img>
    </section>
  )
}