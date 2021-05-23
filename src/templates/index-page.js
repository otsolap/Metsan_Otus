import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Layout from "../components/layout"
import VlogListHome from "../components/vlog-list-home"
import SEO from "../components/seo"
import {
  RiArrowRightSLine,
  RiTwitterFill,
  RiYoutubeFill,
  RiInstagramFill,
  RiRssFill,
} from "react-icons/ri"
import Icons from "../util/socialMedia.json"

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
          date(formatString: "DD MMMM, YYYY", locale: "fi")
          slug
          title
          tags
          featuredImage {
            childImageSharp {
              gatsbyImageData(
                layout: CONSTRAINED
                width: 690
                height: 520
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

  const SoMe = Icons.SoMeIcons.map((icons, index) => {
    return (
      <span className="some-icons" key={"some-icon" + index}>
        {icons.icon === "Twitter" ? (
          <a href={icons.url} target="_blank">
            <RiTwitterFill />
          </a>
        ) : (
          ""
        )}
        {icons.icon === "Youtube" ? (
          <a href={icons.url} target="_blank">
            <RiYoutubeFill />
          </a>
        ) : (
          ""
        )}
        {icons.icon === "Instagram" ? (
          <a href={icons.url} target="_blank">
            <RiInstagramFill />
          </a>
        ) : (
          ""
        )}
        {icons.icon === "Podcast" ? (
          <a href={icons.url} target="_blank">
            <RiRssFill />
          </a>
        ) : (
          ""
        )}
      </span>
    )
  })
  const Image = frontmatter.featuredImage
    ? frontmatter.featuredImage.childImageSharp.gatsbyImageData
    : ""



  return (
    <Layout>
      <SEO />
      <Row>
        <Col md={6} className="home-banner">
          <div className="home-banner-description">
            <h1 className="title">{frontmatter.title}</h1>
            <p className="tagline">{frontmatter.tagline}</p>
            <div className="description" dangerouslySetInnerHTML={{ __html: html }} />
            <Link to={frontmatter.cta.ctaLink} className="button">{frontmatter.cta.ctaText}<span className="icon -right"><RiArrowRightSLine /></span></Link>
          </div>
          <div className="home-banner-SoMe">
            {SoMe}
          </div>
        </Col>
        <Col className="home-banner-image" md={6}>
          {Image ? (
            <GatsbyImage
              image={Image}
              alt={frontmatter.title}
              className="featured-image"
              objectFit="cover"
            />
          ) : ""}
        </Col>
      </Row>
      <VlogListHome data={posts} />
    </Layout >
  )
}

export default HomePage
