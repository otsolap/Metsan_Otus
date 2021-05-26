import React from "react"
import { Link } from "gatsby"
import { RiArrowLeftSLine, RiBugLine, RiSkullLine } from "react-icons/ri"

import SEO from "../components/seo"
import Layout from "../components/layout"

const NotFound = () => (
  <Layout className="not-found-page">
    <SEO title="Page not found" />
    <div className="wrapper" style={{
      textAlign: "center"
    }}>
      <header>
        <RiSkullLine style={{
          fontSize: "128px",
          color: "var(--primary-color)"
        }} />
        <h1>Nyt on tiputti eetterin kaivoihin.</h1>
        <p>Ei se mitään. Internet on täynnä syviä kuoppia, joihin voit tippua.</p>
      </header>
      <Link to="/" className="button"><RiArrowLeftSLine className="icon -left" />Takaisin etusivulle</Link>
      <Link to="/yhteydenotto" className="button -outline">Tee rapsa mun bugisesta nettisivusta. :-/ <RiBugLine className="icon -right" /></Link>
    </div>
  </Layout>
)

export default NotFound