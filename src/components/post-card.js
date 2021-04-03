import React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

const PostCard = ({ data }) => (
  <article
    className="post-card">
    {data.frontmatter.featuredImage ?
      (
        <Link to={data.frontmatter.slug}>
          <GatsbyImage
            image={data.frontmatter.featuredImage.childImageSharp.gatsbyImageData}
            alt={data.frontmatter.title}
            className="featured-image"
          />
        </Link>
      ) : ""
    }
    <div className="post-content">
      {data.frontmatter.tags.map(tag => <span className="vlog-tag">{tag}</span>)}
      <h2 className="title"><Link to={data.frontmatter.slug}>{data.frontmatter.title}</Link></h2>
      <p className="meta"><time>{data.frontmatter.date}</time></p>
    </div>
  </article>
)

export default PostCard

