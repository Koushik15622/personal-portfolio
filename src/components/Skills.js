import dev from "../assets/img/developer-skill.png";
import test from "../assets/img/test-skill.png";
import web from "../assets/img/web-skill.png";
import devops from "../assets/img/devops-skill.png";
import data from "../assets/img/data-skill.png";
import python from "../assets/img/python-skill.png";
export const Skills = () => {
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
      <div className="container skill-bx">
        <h2>Skills</h2>
        <div className="skills-window" tabIndex={0} role="region" aria-label="Scrolling skills">
          <div className="skills-track">
            {[false, true].map(copy => (
              <ul className="skills-grid" key={String(copy)} aria-hidden={copy || undefined}>
                {skills.map(skill => (
                  <li key={skill.title}>
                    <img src={skill.image} alt="" />
                    <h3>{skill.title}</h3>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};