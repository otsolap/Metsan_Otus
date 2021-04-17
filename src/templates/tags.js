import React from "react"
import { Link, graphql } from "gatsby"
import PostCard from "../components/post-card"
import Col from 'react-bootstrap/Col';

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} post${totalCount === 1 ? "" : "s"
    } tagged with "${tag}"`
  return (
    <div>
      <h1>{tagHeader}</h1>
      <ul>
        {edges.map(({ node }) => {
          return (
            <Col sm={12} md={4}>
              <PostCard key={node.id} data={node} />
            </Col>
          )
        })}
      </ul>
      <Link to="/vlogi/">Takaisin Vlogi sivulle</Link>
    </div>
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
          }
        }
      }
    }
  }
`