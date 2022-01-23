import React from "react"
import {
  RiTwitterFill,
  RiYoutubeFill,
  RiInstagramFill,
  RiRssFill,
} from "react-icons/ri"
import Container from "react-bootstrap/Container"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { StaticImage } from "gatsby-plugin-image"
import footer from "../util/content.json"
import Icons from "../util/content.json"

const Footer = ({ children }) => {

  const SoMe = Icons.SoMeIcons.map((icons, index) => {
    return (
      <span className="some-icons" key={"some-icon" + index}>
        {icons.icon === "Twitter" ? (
          <a href={icons.url} target="_blank">
            <RiTwitterFill />
          </a>
        ) : (
          ""
        )}
        {icons.icon === "Youtube" ? (
          <a href={icons.url} target="_blank">
            <RiYoutubeFill />
          </a>
        ) : (
          ""
        )}
        {icons.icon === "Instagram" ? (
          <a href={icons.url} target="_blank">
            <RiInstagramFill />
          </a>
        ) : (
          ""
        )}
        {icons.icon === "Podcast" ? (
          <a href={icons.url} target="_blank">
            <RiRssFill />
          </a>
        ) : (
          ""
        )}
      </span>
    )
  })


  return (
    <footer className="site-footer">
      <Container>
        <Row className="footer-social">
          <Col sm={12} md={11}>
            <div className="footer-social-text"><p>{footer.footer.CTA}</p></div>
            <div className="footer-social-icons">
              {SoMe}
            </div>
            <p>{footer.footer.companyName}©{new Date().getFullYear()}</p>
          </Col>
          <Col className="footer-created-by" sm={12} md={1}>
            <a target="_blank"
              href="https://www.kultakammen.fi/"
              rel="noopener noreferrer"
            >
              <StaticImage
                src="../../static/assets/Kultakammen_white.png"
                alt="Verkkosivun koodannut Kultakämmen"
                className="Kultakammen"
                objectFit="cover"
              />
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer