import React from "react"
import { Link } from "gatsby"
import { RiArrowLeftSLine, RiCheckboxCircleLine } from "react-icons/ri"

import SEO from "../components/seo"
import Layout from "../components/layout"

const Kiitos = () => (
  <Layout className="thanks-page">
    <SEO title="Kiitos" />
    <div className="wrapper" style={{
      textAlign: "center"
    }}>
      <RiCheckboxCircleLine style={{
        fontSize: "128px",
        color: "var(--primary-color)"
      }} />
      <h1>Kiitos! Viestisi on kuitattu.</h1>
      <p>Palaan viestiisi heti kun ehdin.</p>
      <Link to="/" className="button"><RiArrowLeftSLine className="icon -left" />Takaisin etusivulle.</Link>
    </div>

  </Layout>
)

export default Kiitos;