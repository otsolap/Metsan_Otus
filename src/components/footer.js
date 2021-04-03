import React from "react"
import {
  TiSocialTwitter,
  TiSocialInstagram,
  TiSocialYoutube,
  TiRss,
} from "react-icons/ti"


const Footer = () => (
  <footer className="site-footer">
    <div className="container">
      <div className="footer-social">
        <div className="footer-social-text">Seuraa minua:</div>
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
            href="https://open.spotify.com/show/1fmuLQLuEoSOH6hoVnvqEz?si=dY7h8ZJ0RRao4AZoBJnjCA&nd=1"
            rel="noopener noreferrer"
          >
            <span className="icon-container" id="rss-icon">
              <TiRss className="footer-social-icon" />
            </span>
          </a>
          <a
            target="_blank"
            href="https://twitter.com/MetsanOde"
            rel="noopener noreferrer"
          >
            <span className="icon-container" id="tw-icon">
              <TiSocialTwitter className="footer-social-icon" />
            </span>
          </a>
        </div>
      </div>
      <div>Metsän Otus ©{new Date().getFullYear()}</div>
    </div>
  </footer>
)





export default Footer