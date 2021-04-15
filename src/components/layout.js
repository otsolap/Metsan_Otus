import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Container from "react-bootstrap/Container"

import Header from "./header"
import Logo from "./logo"
import Navigation from "./navigation";

import "../assets/scss/style.scss"
import Footer from "./footer";

const query = graphql`
query LayoutQuery {
  site {
    siteMetadata {
      siteTitle: title
    }
  }
}
`

const Layout = ({ children, className }) => {

  const { site } = useStaticQuery(query)
  const { siteTitle } = site.siteMetadata

  return (
    <Container fluid className="px-0">
      <Header>
        <Logo title={siteTitle} />
        <Navigation />
      </Header>
      <main className={"container " + className}>
        {children}
      </main>
      <Footer />
    </Container>
  )
}

export default Layout

