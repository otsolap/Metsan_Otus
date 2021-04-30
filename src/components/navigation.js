import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"

const MenuLinks = ({ }) => {
  const { navMap } = useStaticQuery(query)
  navMap.map((link) => (
    <Nav.Link as="li" key={link.title}>
      <Link
        to={link.link}
      >
        {link.title}
      </Link>
      {link.subMenu && link.subMenu.length > 0 ? (
        <NavDropdown class="sub-items responsive-navbar-nav">
          {link.subMenu.map((sublink) => (
            <NavDropdown.Item a href={sublink.link}>
              {sublink.title}
            </NavDropdown.Item>
          ))}
        </NavDropdown>
      ) : null}
    </Nav.Link>))
}

class Navigation extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="md" className="site-navigation">
        <Navbar.Brand class="logo" href="/">Metsän Otus</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <ul>
            {MenuLinks}
          </ul>
        </Navbar.Collapse>
      </Navbar >
    )
  }
}

const query = graphql`
query menuItems {
  site {
    siteMetadata {
      MenuLinks {
        link
        title
        subMenu {
          link
          title
        }
      }
    }
  }
}
`

export default Navigation
