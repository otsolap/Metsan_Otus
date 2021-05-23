import React from "react"
import { Link, graphql } from "gatsby"
import { RiArrowRightLine, RiArrowLeftLine } from "react-icons/ri"
import kebabCase from "lodash/kebabCase"

import Video from "../components/video";
import Layout from "../components/layout";
import SEO from '../components/seo';

const Post = ({ data, pageContext }) => {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html, excerpt } = markdownRemark

  const Image = frontmatter.featuredImage
    ? frontmatter.featuredImage.childImageSharp.gatsbyImageData
    : ""
  const { previous, next } = pageContext

  let props = {
    previous,
    next
  }

  return (
    <Layout className="page">
      <SEO
        title={frontmatter.title}
        description={frontmatter.description ? frontmatter.description : excerpt}
        image={Image}
        article={true}
      />
      <article className="vlog-post">
        <header className="featured-banner">
          <section className="article-header">
            {frontmatter.tags.map(tag => <a href={`/vlogi/${kebabCase(tag)}`} className="vlog-tag">{tag}</a>)}
            <h1>{frontmatter.title}</h1>
            <time>{frontmatter.date}</time>
          </section>
          <Video
            videoUrl={frontmatter.videoUrl}
          />
        </header>
        <div
          className="vlog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>
      {(previous || next) && (
        <Pagination {...props} />
      )}
    </Layout>
  )
}

export default Post


const Pagination = (props) => (

  <div className="pagination -post">
    <ul>
      {(props.previous && props.previous.frontmatter.template === 'vlog-post') && (
        <li>
          <Link to={props.previous.frontmatter.slug} rel="prev">

            <p><span className="icon -left"><RiArrowLeftLine /></span> Edellinen</p>
            <span className="page-title">{props.previous.frontmatter.title}</span>
          </Link>
        </li>
      )}
      {(props.next && props.next.frontmatter.template === 'vlog-post') && (
        <li>
          <Link to={props.next.frontmatter.slug} rel="next">
            <p>Seuraava <span className="icon -right"><RiArrowRightLine /></span></p>
            <span className="page-title">{props.next.frontmatter.title}</span>
          </Link>
        </li>
      )}
    </ul>
  </div>
)



export const pageQuery = graphql`
  query VlogPostQuery($id: String!) {
    markdownRemark( 
      id: { eq: $id }
    ) {
      id
      html
      excerpt(pruneLength: 148)
      frontmatter {
        date(formatString: "DD MMMM, YYYY", locale: "fi")
        slug
        title
        description
        tags
        videoUrl
        featuredImage {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
      }
    }
  }
`