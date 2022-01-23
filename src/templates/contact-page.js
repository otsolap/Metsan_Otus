import React, { useState } from "react";
import { graphql } from "gatsby"
import { RiSendPlane2Line } from "react-icons/ri";

import Layout from "../components/layout"
import SEO from "../components/seo"

export const pageQuery = graphql`
  query ContactQuery($id: String!){
		markdownRemark(id: { eq: $id }) {
      id
			html
			excerpt(pruneLength: 140)
      frontmatter {
        title
        cta {
          ctaText
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`

const Contact = ({ data }) => {
  const { markdownRemark, site } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  // input type hidden on netlifytä varten, jotta netlify tietää mikä lomake kyseessä.
  // contact on meidän lomake, niin kaikki viestit löytyy contact-lomakkeen alta.
  // honeypot=bot-field on botteja varten.
  // p hidden pitää kohdan piilossa, mutta console.logilla sen löytää. ;-)
  return (
    <Layout className="contact-page">
      <SEO
        title={frontmatter.title}
        description={frontmatter.title + " " + site.siteMetadata.title}
      />
      <div className="wrapper">
        <h1>{frontmatter.title}</h1>
        <div className="description" dangerouslySetInnerHTML={{ __html: html }} />
        <form
          className="contact-form"
          action="/kiitos"
          name="contact"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
        >
          <input type="hidden" name="form-name" value="contact" />
          <p hidden><input name="bot-field" /></p>
          <p>
            <label><input
              required
              placeholder="Nimi *"
              type="text"
              name="name"
            />
            </label>
          </p>
          <p>
            <label><input required
              placeholder="Sähköposti *"
              type="email"
              name="email"
            />
            </label>
          </p>
          <p>
            <label><input required
              placeholder="Puhelin *"
              type="number"
              name="phone"
            />
            </label>
          </p>
          <p>
            <label><input
              placeholder="Aihe"
              type="text"
              name="subject"
            />
            </label>
          </p>
          <p>
            <label><textarea
              placeholder="Viesti"
              name="message"
            ></textarea></label>
          </p>
          <p className="text-align-center">
            <button className="button"
              type="submit">
              {frontmatter.cta.ctaText}
              <span className="icon -right"><RiSendPlane2Line />
              </span>
            </button>
          </p>
        </form>
      </div>
    </Layout>
  )
}

export default Contact