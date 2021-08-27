import React from 'react';
import { graphql, StaticQuery, Link } from 'gatsby';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function menuLinks() {
  return (
    <StaticQuery
      query={graphql`
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
   `} render={data => (
        <ul className="menulink-items">
          {data.site.siteMetadata.MenuLinks.map((path) => (
            <Nav.Link className="" as='li' key={path.title}>
              <Link to={path.link}>
                {path.title}
              </Link>
              {path.subMenu && (
                <NavDropdown class='sub-items responsive-navbar-nav'>
                  {path.subMenu.map((subpath) => (
                    <NavDropdown.Item a href={subpath.link}>
                      {subpath.title}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
              )}
            </Nav.Link>))
          }</ul>
      )}
    />
  );
}

class Navigation extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand='md' className='site-navigation'>
        <Navbar.Brand className='logo' href='/'>Metsän Otus</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          {menuLinks()}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navigation;