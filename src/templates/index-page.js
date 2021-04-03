import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { RiArrowRightSLine } from "react-icons/ri"

import Layout from "../components/layout"
import VlogListHome from "../components/vlog-list-home"
import SEO from "../components/seo"

export const pageQuery = graphql`
query HomeQuery($id: String!){
  markdownRemark(id: { eq: $id }) {
    id
    html
    frontmatter {
      title
      tagline
      featuredImage {
        childImageSharp {
          gatsbyImageData(
            layout: CONSTRAINED
            width: 585
            height: 439
          )
        }
      }
      cta {
        ctaText
        ctaLink
      }
    }
  }
  posts : allMarkdownRemark(
    sort: { order: DESC, fields: [frontmatter___date] }
    filter: { frontmatter: { template: { eq: "vlog-post" } } }
    limit: 6
  ) {
    edges {
      node {
        id
        excerpt(pruneLength: 250)
        frontmatter {
          date(formatString: "DD MMMM, YYYY")
          slug
          title
          featuredImage {
            childImageSharp {
              gatsbyImageData(
                layout: FIXED
                width: 345
                height: 260
              )
            }
          }
        }
      }
    }
  }
}
`

const HomePage = ({ data }) => {
  const { markdownRemark, posts } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  const Image = frontmatter.featuredImage
    ? frontmatter.featuredImage.childImageSharp.gatsbyImageData
    : ""
  return (
    <Layout>
      <SEO />
      <div className="home-banner grids col-1 sm-2">
        <div>
          <h1 className="title">{frontmatter.title}</h1>
          <p className="tagline">{frontmatter.tagline}</p>
          <div className="description" dangerouslySetInnerHTML={{ __html: html }} />
          <Link to={frontmatter.cta.ctaLink} className="button">{frontmatter.cta.ctaText}<span className="icon -right"><RiArrowRightSLine /></span></Link>
        </div>
        <div>
          {Image ? (
            <GatsbyImage
              image={Image}
              alt={frontmatter.title + " - Featured image"}
              className="featured-image"
            />
          ) : ""}
        </div>
      </div>
      <VlogListHome data={posts} />
    </Layout>
  )
}

export default HomePage
