import React from "react"
import { Link } from "gatsby"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
const MenuSettings = require('../../config.js');


class Navigation extends React.Component {
  render() {
    const listMenuItems = MenuSettings.MenuItems.map((path) => (
      <Nav.Link as="li" key={path.title}>
        <Link
          to={path.path}
        >
          {path.title}
        </Link>
        {path.subItems && path.subItems.length > 0 ? (
          <NavDropdown class="sub-items">
            {path.subItems.map((subpath) => (
              <NavDropdown.Item a href={subpath.path}>
                {subpath.title}
              </NavDropdown.Item>
            ))}
          </NavDropdown>
        ) : null}
      </Nav.Link>))

    return (
      <Navbar className="site-navigation">
        <ul>
          {listMenuItems}
        </ul>
      </Navbar >
    )
  }
}

export default Navigation
