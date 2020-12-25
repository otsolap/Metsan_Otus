import React from "react"
import { Link } from "gatsby"
import { Container, Navbar, Nav } from 'react-bootstrap';

const MenuItems = [
  {
    path: "/",
    title: "Etusivu"
  },
  {
    path: "/metsan-otus",
    title: "Metsän Otus"
  },
  {
    path: "/vlog",
    title: "Vlog"
  },
  {
    path: "/contact",
    title: "Ota Yhteyttä"
  },
]

// kuva logo.
//<Link to="/">
//<img src={logo} alt={siteTitle} width='200' />
//</Link>


const ListLink = (props) => (<li><Link to={props.to}>{props.children}</Link></li>)

const Navigation = ({ siteTitle }) => {
  const listMenuItems = MenuItems.map((menuItem, index) =>
    <Nav.Item as="li"><ListLink key={index} to={menuItem.path}>{menuItem.title}</ListLink></Nav.Item>
  )

  return (
    <Container>
      <Navbar className="site-navigation" expand="md" collapseOnSelect={true}>

        <Navbar.Brand href="/">{siteTitle}</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarResponsive" />
        <Navbar.Collapse id="navbarResponsive">
          <Nav as="ul" className="ml-auto">
            <ul classname="navbar-nav justify-content-center">
              {listMenuItems}
            </ul>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  )
}



export default Navigation
