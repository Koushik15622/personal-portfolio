import { Col } from "react-bootstrap";

export const ProjectCard = ({ title, description, imgUrl, href }) => {
  const Tile = href ? "a" : "article";
  return (
    <Col xs={12} sm={6} md={4}>
      <Tile className="proj-imgbx" href={href} tabIndex={href ? undefined : 0}>
        <img src={imgUrl} alt="" />
        <div className="proj-txtx">
          <h4>{title}</h4>
          <span>{description}</span>
        </div>
      </Tile>
    </Col>
  )
}
