import React from "react"
import { Link } from "gatsby"
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';

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
    path: "/vlogi",
    title: "Vlogi"
  },
  {
    path: "/contact",
    title: "Ota Yhteyttä"
  },
]

const ListLink = (props) => (<li><Link to={props.to}>{props.children}</Link></li>)


class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = { showMenu: false }


    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(state => ({
      showMenu: !state.showMenu
    }))
  }

  render() {
    const listMenuItems = MenuItems.map((menuItem, index) =>
      <ListLink key={index} to={menuItem.path}>{menuItem.title}</ListLink>
    )
    return (
      <nav className="site-navigation">
        <button onClick={this.handleToggleClick} className={"menu-trigger sivun navigaatio button" + (this.state.showMenu ? " is-active" : "")}>
          <div className="icon-menu-line"><RiMenu3Line /></div>
          <div className="icon-menu-close"><RiCloseLine /></div>
        </button>
        <ul>
          {listMenuItems}
        </ul>
      </nav>
    )
  }
}

export default Navigation
