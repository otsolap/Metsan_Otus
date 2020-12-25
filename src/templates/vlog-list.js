import React from "react"
import { Link, graphql } from "gatsby"
import { RiArrowRightLine, RiArrowLeftLine } from "react-icons/ri"

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
						featuredImage {
							childImageSharp {
								fluid(maxWidth: 540, maxHeight: 360, quality: 80) {
                  ...GatsbyImageSharpFluid
                  ...GatsbyImageSharpFluidLimitPresentationSize
                }
							}
						}
          }
        }
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
            <span className="icon -left"><RiArrowLeftLine /></span> Previous
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
            Next <span className="icon -right"><RiArrowRightLine /></span>
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
    const vlogSlug = '/vlog/'
    const isFirst = currentPage === 1
    const isLast = currentPage === numVlogPages
    const prevPage = currentPage - 1 === 1 ? vlogSlug : vlogSlug + (currentPage - 1).toString()
    const nextPage = vlogSlug + (currentPage + 1).toString()

    const posts = data.allMarkdownRemark.edges
      .filter(edge => !!edge.node.frontmatter.date)
      .map(edge =>
        <PostCard key={edge.node.id} data={edge.node} />
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
          title={"Vlogsivu" + currentPage + " of " + numVlogPages}
          description={"Tuoreimmat mielipiteet " + currentPage + " of " + numVlogPages}
        />
        <h1>vlog</h1>
        <div className="grids col-1 sm-2 lg-3">
          {posts}
        </div>
        <Pagination {...props} />
      </Layout>
    )
  }
}

export default VlogIndex;