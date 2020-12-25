import React from "react"
import {
  TiSocialTwitter,
  TiSocialYoutube,
} from "react-icons/ti"


const Footer = () => (
  <footer className="site-footer">
    <div className="container">
      <div className="footer-social">
        <div className="footer-social-text">Follow Us</div>
        <div className="footer-social-icons">
          <a
            target="_blank"
            href="https://twitter.com/"
            rel="noopener noreferrer"
          >
            <span className="icon-container" id="tw-icon">
              <TiSocialTwitter className="footer-social-icon" />
            </span>
          </a>
          <a
            target="_blank"
            href="https://www.youtube.com/"
            rel="noopener noreferrer"
          >
            <span className="icon-container" id="yt-icon">
              <TiSocialYoutube className="footer-social-icon" />
            </span>
          </a>
        </div>
      </div>
      <div>© {new Date().getFullYear()} Metsän Otus</div>
    </div>
  </footer>
)





export default Footer