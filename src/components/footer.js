import React from "react"
import {
  TiSocialTwitter,
  TiSocialInstagram,
  TiSocialYoutube,
  TiRss,
} from "react-icons/ti"
import Container from "react-bootstrap/Container"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { StaticImage } from "gatsby-plugin-image"

const Footer = () => (
  <footer className="site-footer">
    <Container>
      <Row className="footer-social">
        <Col sm={12} md={11}>
          <div className="footer-social-text"><p>Seuraa minua:</p></div>
          <div className="footer-social-icons">
            <a
              target="_blank"
              href="https://www.youtube.com/channel/UC4t1gUHiI6hTPyAOR3zlqaw"
              rel="noopener noreferrer"
            >
              <span className="icon-container" id="yt-icon">
                <TiSocialYoutube className="footer-social-icon" />
              </span>
            </a>
            <a
              target="_blank"
              href="https://www.instagram.com/MetsanOtus/"
              rel="noopener noreferrer"
            >
              <span className="icon-container" id="ig-icon">
                <TiSocialInstagram className="footer-social-icon" />
              </span>
            </a>
            <a
              target="_blank"
              href="https://open.spotify.com/show/5aQQ6bUXCgddbb6rIjuuxQ"
              rel="noopener noreferrer"
            >
              <span className="icon-container" id="rss-icon">
                <TiRss className="footer-social-icon" />
              </span>
            </a>
            <a
              target="_blank"
              href="https://twitter.com/MetsanOtus"
              rel="noopener noreferrer"
            >
              <span className="icon-container" id="tw-icon">
                <TiSocialTwitter className="footer-social-icon" />
              </span>
            </a>
          </div>
          <p>Metsän Otus ©{new Date().getFullYear()}</p>
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





export default Footer