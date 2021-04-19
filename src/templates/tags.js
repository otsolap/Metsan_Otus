
import React from "react"
import { Link, graphql } from "gatsby"
import PostCard from "../components/post-card"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Layout from "../components/layout"
import SEO from "../components/seo"

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} vlogi${totalCount === 1 ? "" : "a"
    } aiheesta ${tag}`

  const vlogTags =
    (edges.map(({ node }) => {
      return (
        <Col sm={12} md={4}>
          <PostCard key={node.id} data={node} />
        </Col>
      )
    }))


  return (
    <Layout className="tags-page">
      <SEO
        title={"Metsän Otus  - " + `${tag}`}
        description={"Tuoreimmat mielipiteet " + `${tag}`}
      />
      <h1 className="tag-page-headers py-4">{tagHeader}</h1>
      <Row className="py-2">
        {vlogTags}
      </Row>
      <h2 className="tag-page-headers py-4"> <Link to="/vlogi/">Vlogisivulle</Link> </h2>
    </Layout>
  )
}

export default Tags;

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            slug
            tags
            featuredImage {
							childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED
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
