import React from "react"
import { Link, graphql } from "gatsby"
import { RiArrowRightLine, RiArrowLeftLine } from "react-icons/ri"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import kebabCase from "lodash/kebabCase"
import Layout from "../components/layout"
import PostCard from "../components/post-card"
import SEO from "../components/seo"

export const vlogListQuery = graphql`
  query VlogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { template: { eq: "vlog-post" } } }
      limit: $limit
      skip: $skip
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
                  width: 345
                  height: 260
                )
							}
						}
          }
        }
      }
      group(field: frontmatter___tags) {
        fieldValue
      }
    }
  }
`
const Pagination = (props) => (
  <div className="pagination">
    <ul>
      {!props.isFirst && (
        <li>
          <Link to={props.prevPage} rel="prev">
            <span className="icon -left"><RiArrowLeftLine /></span> Edellinen
          </Link>
        </li>
      )}
      {Array.from({ length: props.numVlogPages }, (_, i) => (
        <li key={`pagination-number${i + 1}`} >
          <Link
            to={`${props.vlogSlug}${i === 0 ? '' : i + 1}`}
            className={props.currentPage === i + 1 ? "is-active num" : "num"}
          >
            {i + 1}
          </Link>
        </li>
      ))}
      {!props.isLast && (
        <li>
          <Link to={props.nextPage} rel="next">
            Seuraava <span className="icon -right"><RiArrowRightLine /></span>
          </Link>
        </li>
      )}
    </ul>
  </div>
)
class VlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const { currentPage, numVlogPages } = this.props.pageContext
    const vlogSlug = '/vlogi/'
    const isFirst = currentPage === 1
    const isLast = currentPage === numVlogPages
    const prevPage = currentPage - 1 === 1 ? vlogSlug : vlogSlug + (currentPage - 1).toString()
    const nextPage = vlogSlug + (currentPage + 1).toString()

    const tags = data.allMarkdownRemark.group.map(tag => (
      <button className="tag-button button" key={tag.fieldValue}>
        <Link to={`/vlogi/${kebabCase(tag.fieldValue)}/`}>
          {tag.fieldValue}
        </Link>
      </button>
    ))

    const posts = data.allMarkdownRemark.edges
      .filter(edge => !!edge.node.frontmatter.date)
      .map(edge =>
        <Col sm={12} md={4}>
          <PostCard key={edge.node.id} data={edge.node} />
        </Col>
      )
    let props = {
      isFirst,
      prevPage,
      numVlogPages,
      vlogSlug,
      currentPage,
      isLast,
      nextPage
    }


    return (
      <Layout className="vlog-page">
        <SEO
          title={"Vlogsivu " + currentPage + " / " + numVlogPages}
          description={"Tuoreimmat mielipiteet " + currentPage + " of " + numVlogPages}
        />
        <h1>Vlogi</h1>
        <h2>Kategoriat</h2>
        <Row className="py-5 tag-container">
          {tags}
        </Row>
        <h2>Kaikki Vlogit</h2>
        <Row className="py-5">
          {posts}
        </Row>
        <Pagination {...props} />
      </Layout >
    )
  }
}

export default VlogIndex;