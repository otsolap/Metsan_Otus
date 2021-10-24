import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Container from "react-bootstrap/Container"

import Header from "./header"
import Navigation from "./navigation";

import "../assets/scss/style.scss"
import Footer from "./footer";
import Search from "../components/search"


const query = graphql`
query LayoutQuery {
  site {
    siteMetadata {
      siteTitle: title
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
  siteSearchIndex {
    index
  }
}
`



const Layout = ({ children, className, props }) => {

  const { site, siteSearchIndex } = useStaticQuery(query)
  const { siteTitle } = site.siteMetadata

  return (
    <Container fluid className="px-0">
      <Header>
        <Navigation />
        <Search searchIndex={siteSearchIndex.index} />
      </Header>
      <main className={"container " + className}>
        {children}
      </main>
      <Footer />
    </Container>
  )
}

export default Layout

