import React from "react"
import { Link, graphql } from "gatsby"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import kebabCase from "lodash/kebabCase"
import Layout from "../components/layout"
import PostCard from "../components/post-card"
import SEO from "../components/seo"

class TagPage extends React.Component {
  render() {
    const { data } = this.props
    const posts = data.allMarkdownRemark.edges
      .filter(edge => !!edge.node.frontmatter.date)
      .map(edge =>
        <Col sm={12} md={4}>
          <PostCard key={edge.node.id} data={edge.node} />
        </Col>
      )

    return (
      <div>
        <Row className="py-5" >
          {posts}
        </Row>
        <Link to="/vlogi/">Takaisin Vlogi sivulle</Link>
      </div>
    )
  }
}

export default TagPage;

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } template: { eq: "vlog-post" }  }  }
    ) {
      totalCount
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "DD MMMM, YYYY", locale: "fi")
            slug
						title
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