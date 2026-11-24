import { Col } from "react-bootstrap";

export const ProjectCard = ({ title, description, imgUrl }) => {
  return (
    <Col xs={12} sm={6} md={4}>
      <article className="proj-imgbx" tabIndex={0}>
        <img src={imgUrl} alt="" />
        <div className="proj-txtx">
          <h4>{title}</h4>
          <span>{description}</span>
        </div>
      </article>
    </Col>
  )
}
