import { useEffect, useState } from "react";
import { ParticleField } from "./ParticleField";
import portrait from "../assets/img/thinking-avatar.png";
import computer from "../assets/img/comp.gif";

const roles = ["AI Software Engineer", "Security Engineer", "Software Developer", "Penetration Tester", "Web Designer"];

function Role() {
  const [word, setWord] = useState(0);
  const [length, setLength] = useState(1);
  const [deleting, setDeleting] = useState(false);
  const role = roles[word];
  useEffect(() => {
    const full = length === role.length;
    const timer = setTimeout(() => {
      if (full && !deleting) setDeleting(true);
      else if (length === 0 && deleting) {
        setWord((word + 1) % roles.length);
        setDeleting(false);
      } else setLength(length + (deleting ? -1 : 1));
    }, full && !deleting ? 1800 : deleting ? 42 : 90);
    return () => clearTimeout(timer);
  }, [length, word, deleting, role]);
  return <h2><span className="visually-hidden static-role">{roles[0]}</span><span aria-hidden="true" className="typed-role">{role.slice(0, length)}</span></h2>;
}

export const Banner = () => (
  <section className="banner" id="home">
    <ParticleField />
    <div className="hero-stage container">
      <div className="hero-intro">
        <div className="tagline">Field notes on software &amp; security</div>
        <h1>Koushik <em>PLN</em></h1>
        <Role />
        <p>I explore the intersection of software development and security, from AI pipelines to secure cloud systems.</p>
      </div>
      <div className="hero-art">
        <img className="hero-portrait" src={portrait} alt="Koushik PLN" />
        <div className="thought-bubble" aria-hidden="true">
          <img className="hero-computer" src={computer} alt="" />
        </div>
      </div>
    </div>
  </section>
);
