import dev from "../assets/img/developer-skill.png";
import test from "../assets/img/test-skill.png";
import web from "../assets/img/web-skill.png";
import devops from "../assets/img/devops-skill.png";
import data from "../assets/img/data-skill.png";
import python from "../assets/img/python-skill.png";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import arrow1 from "../assets/img/arrow1.svg";
import arrow2 from "../assets/img/arrow2.svg";
import colorSharp from "../assets/img/color-sharp.png"

export const Skills = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const skills = [
    {title: "Software Development", image: dev},
    {title: "Penetration testing", image: test},
    {title: "Web Designing", image: web},
    {title: "DevOps management", image: devops},
    {title: "Data engineering", image: data},
    {title: "Python Programming", image: python}

  ]
  
  return (
    <section className="skill" id="skills">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="skill-bx wow zoomIn">
                        <h2>Skills</h2>
                        <p>The sliders below provide a high-level overview of my expertise in each area. <br></br> For a comprehensive list of my skills, please refer to my resume, which is available for download below.</p>
                        <Carousel responsive={responsive} infinite={true} className="owl-carousel owl-theme skill-slider">
                            {skills.map((skill, index) => (
                                <div className="item" key={index}>
                                    <img src={skill.image} alt={skill.title} />
                                    <h5>{skill.title}</h5>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
        <img className="background-image-left" src={colorSharp} alt="Image" />
    </section>
  )
}
